import express, { json } from 'express';
import mongoose from 'mongoose';

import multer from 'multer';
import cors from 'cors';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

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

//создаем хранилище для хранения картинок
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

/**РОУТЫ ДЛЯ ПОЛЬЗОВАТЕЛЯ */
//Авторизация пользователя
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);

//Регистрация пользователя
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

//Получение информации о себе
app.get('/auth/me', checkAuth, UserController.getMe);

/*-----------------------------------------------------*/

/*РОУТЫ ДЛЯ КАРТИНОК*/

/**Роутер загрузки картинки */
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

/**--------------------------------------------------- */

/** РОУТЫ ДЛЯ СТАТЕЙ */
//Получение всех статей
app.get('/posts', PostController.getAll);

/*Получение тэгов */
app.get('/tags', PostController.getLastTags);
app.get('/posts/tags', PostController.getLastTags);

//Получение одной статьи
app.get('/posts/:id', PostController.getOne);

//Создание статьи
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

/*Удаление статьи*/
app.delete('/posts/:id', checkAuth, PostController.remove);

/** Изменение статьи */
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

/**------------------------------------------------------- */

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
