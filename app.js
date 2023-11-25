const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { PORT = 3000, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_CONN);

app.use((req, res, next) => {
  req.user = {
    _id: '655faec70c1894c613abf29b',
  };

  next();
});

app.use(bodyParser.json());
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Путь не найден' });
});

app.listen(PORT);
