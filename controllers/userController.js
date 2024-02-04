import { StatusCodes } from 'http-status-codes';

import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get current user' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Application Stats' });
};

export const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update user' });
};
