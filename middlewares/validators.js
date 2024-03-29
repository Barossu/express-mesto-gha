const { celebrate, Joi } = require('celebrate');

const urlRegEx = /^https?:\/\/(www\.)?(\S+)$#?/;

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({

    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegEx),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    link: Joi.string().required().regex(urlRegEx),
  }),
});
