import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

import Job from '../models/JobModel.js';

export const createNewJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  // Check for query strings for any potential filters and sort conditions
  let { search, jobStatus, jobType, sort } = req.query;

  // Prepare query object based on whether filter(s) if exists
  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search && search.trim() !== '') {
    search = search.trim();
    queryObj.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus.trim() !== '' && jobStatus.trim() !== 'all') {
    queryObj.jobStatus = jobStatus.trim();
  }

  if (jobType && jobType.trim() !== '' && jobType.trim() !== 'all') {
    queryObj.jobType = jobType.trim();
  }

  // Sorting functionality
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Pagination feature
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; // number of jobs to skip

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);
  const totalJobs = await Job.countDocuments(queryObj);
  const numberOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numberOfPages, currentPage: page, jobs });
};

export const getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Job deleted successfully', job: deletedJob });
};

export const showStats = async (req, res) => {
  // Stats logic
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const finalStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // Monthly applications logic
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const formattedDate = day()
        .year(year)
        .month(month - 1)
        .format('MMM YY');
      return { date: formattedDate, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ stats: finalStats, monthlyApplications });
};
