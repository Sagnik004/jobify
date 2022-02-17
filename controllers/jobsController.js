import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createJob = async (req, res) => {
  const { position, company, status, jobType, jobLocation } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const userJobDetails = {
    company,
    position,
    status,
    jobType,
    jobLocation,
    createdBy: req.user.userId,
  };
  const newJob = await Job.create(userJobDetails);

  res.status(StatusCodes.CREATED).json({ job: newJob });
};

const getAllJobs = async (req, res) => {
  const userJobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs: userJobs, totalJobs: userJobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  res.send("updateJob function");
};

const deleteJob = async (req, res) => {
  res.send("deleteJob function");
};

const showStats = async (req, res) => {
  res.send("showStats function");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
