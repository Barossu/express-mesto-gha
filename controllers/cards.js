const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const updateLike = (req, res, next, method) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    method,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toHexString() !== req.user._id) {
        next(new ForbiddenError('Нет прав на удаление чужой карточки'));
      }

      Card.findByIdAndDelete(req.params.cardId)
        .then((deletedCard) => {
          if (!deletedCard) {
            throw new NotFoundError('Нет карточки с таким id');
          }
          res.send(deletedCard);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new ValidationError('Переданы некорректные данные'));
          }
          next(err);
        });
    });
};

module.exports.likeCard = (req, res, next) => {
  updateLike(req, res, next, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res, next) => {
  updateLike(req, res, next, { $pull: { likes: req.user._id } });
};
