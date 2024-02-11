import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import JobModel from './models/JobModel.js';
import UserModel from './models/UserModel.js';

dotenv.config();

try {
  await mongoose.connect(process.env.DB_URI);
  // const user = await UserModel.findOne({ email: 'john@gmail.com' }); // Admin user
  const user = await UserModel.findOne({ email: 'zippy@gmail.com' }); // Test user

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await JobModel.deleteMany({ createdBy: user._id });
  await JobModel.create(jobs);
  console.log('Success!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
