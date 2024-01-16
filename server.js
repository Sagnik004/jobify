import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// Middleware's
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  // For better development logs
}
app.use(express.json()); // Allow to receive JSON payloads

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port:${port}...`);
});
