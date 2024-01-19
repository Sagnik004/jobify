import Job from '../models/JobModel.js';

export const createNewJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `No job found with id ${id}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedJob) {
    return res.status(404).json({ msg: `No job found with id ${id}` });
  }

  res.status(200).json({ msg: 'Job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await Job.findByIdAndDelete(id);
  if (!deletedJob) {
    return res.status(400).json({ msg: `No job found with id ${id}` });
  }
  res.status(200).json({ msg: 'Job deleted successfully', job: deletedJob });
};
