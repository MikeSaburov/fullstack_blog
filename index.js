import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hi Mike');
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
