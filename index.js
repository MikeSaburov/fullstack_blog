import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://admin:sms12021985@cluster1.gtaa1oc.mongodb.net/?retryWrites=true&w=majority'
);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi Mike');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Mike Saburov',
    },
    'secret123'
  );
  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server OK');
});
