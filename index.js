import express, { json } from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

//Подключение к базе данных (MongoDB)
mongoose
  .connect(
    'mongodb+srv://admin:sms12021985@cluster1.gtaa1oc.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('Ошибка подключения к DB', err);
  });

const app = express();

app.use(express.json());

//Авторизация пользователя
app.post('/auth/login', UserController.login);

//Регистрация пользователя
app.post('/auth/register', registerValidation, UserController.register);

//Получение информации о себе
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
