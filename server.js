import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import jobRouter from './routes/jobRouter.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// Middleware's
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // For better development logs
}
app.use(express.json()); // Allow to receive JSON payloads

/******************** ROUTES ********************/
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

// JOB RELATED ROUTES
app.use('/api/v1/jobs', jobRouter);

// ROUTE NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Resource not found' });
});
// GLOBAL ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Something went wrong' });
});

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
