import PostModel from '../models/Post.js';

//Получение тэгов
export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Получение всех статей
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Получение одной статьи
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },

      {
        $inc: { viewsCount: 1 },
      },

      {
        returnDocument: 'after',
      }
    ).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось',
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Такой статьи больше не существует',
        });
      }
      res.json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью!',
    });
  }
};

//Удаление статьи
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({ _id: postId }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось ',
        });
      }
      if (!doc) {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось найти статью',
        });
      }
      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью!',
    });
  }
};

//Создание статьи
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

//Редактирование статьи
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      succes: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};
