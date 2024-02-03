import { StatusCodes } from 'http-status-codes';

import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

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
  const { email, password } = req.body;

  // Find if valid email/user
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  // Find if valid password
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  // If we like to validate in single line
  // const isValidUser = user && (await comparePassword(password, user.password));
  // if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

  // Generate JWT and send back as HTTP Only cookie which should expire in 1 day
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMillis),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged in' });
};
