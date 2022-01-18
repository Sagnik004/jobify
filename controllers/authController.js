import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";
import { BadRequestError } from "../errors/index.js";

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
  res.status(StatusCodes.CREATED).json({ user: respObj, token });
};

const login = async (req, res) => {
  res.send("Login user");
};

const updateUser = async (req, res) => {
  res.send("Updates user");
};

export { register, login, updateUser };
