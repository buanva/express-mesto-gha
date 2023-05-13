const { BadRequest, NotFound, InternalServerError } = require('../errors/MyError');
const {
  createCard,
  likeCard,
  dislikeCard,
  cardNotFound,
} = require('../errors/messages');
const { sendError } = require('../helpers/sendError');
const Card = require('../models/card');

module.exports.getAllCards = (_, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      sendError(res, new InternalServerError(err.message, err.name));
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(res, new BadRequest(createCard));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound(cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        sendError(res, err);
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound(cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        sendError(res, err);
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendError(res, new BadRequest(likeCard));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound(cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        sendError(res, err);
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendError(res, new BadRequest(dislikeCard));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};
