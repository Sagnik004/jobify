import { nanoid } from 'nanoid';

import Job from '../models/JobModel.js';

// Local data (temporary)
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

export const createNewJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
}

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: `Please provide job id` });
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job found with id ${id}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find(job => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job found with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'Job modified', job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find(job => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: `No job found with id ${id}` });
  }
  const newJobs = jobs.filter(job => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'Job deleted successfully' });
};
