const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
    });
};