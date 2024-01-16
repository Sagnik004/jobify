import express from 'express';

const port = 5100;
const app = express();

// Middleware's
app.use(express.json()); // Allow to receive JSON payloads

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
