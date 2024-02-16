import 'express-async-errors'; // must be at the top and start of application
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/******************** MIDDLEWARES ********************/
// Setup public folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // For better development logs
}

app.use(express.json()); // Allow to receive JSON payloads
app.use(cookieParser()); // Parse incoming cookies (JWT)

/******************** ROUTES ********************/
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

// AUTH,JOB RELATED ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

// Expose endpoint to access UI (not used in DEV, but applicable for PROD)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// ROUTE NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Resource not found' });
});
// GLOBAL ERROR HANDLER MIDDLEWARE
app.use(errorHandlerMiddleware);

/******************** CONNECT TO DB & START SERVER ********************/
try {
  await mongoose.connect(process.env.DB_URI);
  console.log('Connected to DB...');
  app.listen(port, () => {
    console.log(`Server running on port:${port}...`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
