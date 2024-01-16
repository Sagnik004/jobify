import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

// Local data (temporary)
let jobs = [
  {id: nanoid(), company: 'apple', position: 'front-end'},
  {id: nanoid(), company: 'google', position: 'back-end'},
];

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// Middleware's
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  // For better development logs
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
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs })
});

app.listen(port, () => {
  console.log(`Server running on port:${port}...`);
});
