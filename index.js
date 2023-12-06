import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

import userModel from './models/User.js';

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

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  //Шифрование пароля
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new userModel({
    email: req.body.email,
    passwordHash,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
  });

  const user = await doc.save();

  res.json({ success: true });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
