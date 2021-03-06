import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if name, email & password are provided
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Check if user/email already exists
  const emailFound = await User.findOne({ email }).exec();
  if (emailFound) {
    throw new BadRequestError("Email already in use");
  }

  // Create new user. Also create the JWT
  const newUser = await User.create({ name, email, password });
  const token = newUser.createJWT();

  const respObj = {
    name: newUser.name,
    email: newUser.email,
    lastName: newUser.lastName,
    location: newUser.location,
    _id: newUser._id,
  };

  res.status(StatusCodes.CREATED).json({
    user: respObj,
    token,
    location: newUser.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordMatching = await user.comparePassword(password);
  if (!isPasswordMatching) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
