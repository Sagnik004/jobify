import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

// Local data (temporary)
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// Middleware's
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // For better development logs
}
app.use(express.json()); // Allow to receive JSON payloads

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: `Please provide job id` });
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job found with id ${id}` });
  }
  res.status(200).json({ job });
});

// UPDATE JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
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
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find(job => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: `No job found with id ${id}` });
  }
  const newJobs = jobs.filter(job => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'Job deleted successfully' });
});

// Route not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Resource not found' });
});
// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server running on port:${port}...`);
});
