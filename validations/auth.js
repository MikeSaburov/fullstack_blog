import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({
    min: 6,
  }),
  body('fullName', 'Укажите имя не менее 3 символов').isLength({ min: 3 }),
  body('avaratUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
