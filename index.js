import express, { json } from 'express';
import mongoose from 'mongoose';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

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
app.post('/auth/login', loginValidation, UserController.login);

//Регистрация пользователя
app.post('/auth/register', registerValidation, UserController.register);

//Получение информации о себе
app.get('/auth/me', checkAuth, UserController.getMe);

//app.get('/posts', PostController.getAll);
//app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
//app.delete('/posts', PostController.remove);
//app.patch('/posts', PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
