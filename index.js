import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://admin:sms12021985@cluster1.gtaa1oc.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('Ошибка подключения к DB', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
