const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('БД подключена'))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: '655faec70c1894c613abf29b',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Сервер запущен на порте: ${PORT}`);
  }
});
