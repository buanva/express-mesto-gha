const { BadRequest, NotFound, Forbidden } = require('../errors/MyError');
const {
  createCard,
  likeCard,
  dislikeCard,
  cardNotFound,
  forbidden,
} = require('../errors/messages');
const Card = require('../models/card');

const populates = ['owner', 'likes'];

module.exports.getAllCards = (_, res, next) => {
  Card.find({})
    .populate(populates)
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      next(err.name === 'ValidationError' ? new BadRequest(createCard) : err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound(cardNotFound))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new Forbidden(forbidden);
      }
      return Card.findByIdAndDelete(card._id).populate(populates);
    })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(cardNotFound) : err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(cardNotFound))
    .populate(populates)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err.name === 'ValidationError' || err.name === 'CastError' ? new BadRequest(likeCard) : err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(cardNotFound))
    .populate(populates)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err.name === 'ValidationError' || err.name === 'CastError' ? new BadRequest(dislikeCard) : err);
    });
};
