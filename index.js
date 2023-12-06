import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

//Подключение к базе данных (MongoDB)
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

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({ success: true });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
