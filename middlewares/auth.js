const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'bbf45588b98448e2233a042bde39a219617b9c71e6c71adffaf01415d27ba310' } = process.env;
const error = new UnauthorizedError('Необходима авторизация');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(error);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(error);
  }

  req.user = payload;
  next();
};
