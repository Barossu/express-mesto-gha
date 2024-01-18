const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Слишком много запросов с этого IP',
});

dotenv.config();

const app = express();
const { PORT = 3000, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_CONN);

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.all('*', (req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});
app.use(errorHandler);

app.listen(PORT);
