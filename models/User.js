import mongoose from 'mongoose';

//Создаем схему User
const UserShema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserShema);
