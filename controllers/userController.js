import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';

import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import { formatImage } from '../middleware/multerMiddleware.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    // Format image since we are using in-memory option now,
    // and cloudinary does not accept in-memory buffer data...
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);

    // Moving away from disk storage, hence below line is commented out.
    // await fs.unlink(req.file.path); // Remove img from file path
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const usersPreviousDetails = await User.findByIdAndUpdate(
    req.user.userId,
    newUser
  );
  // If user is updating profile image, and user previously had a profile image,
  // then delete the old image.
  if (req.file && usersPreviousDetails.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(usersPreviousDetails.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'User updated successfully' });
};
