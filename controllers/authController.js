import { StatusCodes } from 'http-status-codes';

import User from '../models/UserModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
  // First user to register in the site will be an admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  
  // Hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'User created successfully!' });
};

export const login = async (req, res) => {
  res.send('login');
};
