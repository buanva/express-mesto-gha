const { BadRequest, NotFound } = require('../errors/MyError');

const {
  updateProfile,
  updateAvatar,
  userNotFound,
} = require('../errors/messages');
const User = require('../models/user');

module.exports.getAllUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(userNotFound) : err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(userNotFound) : err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err.name === 'CastError' || err.name === 'ValidationError' ? new BadRequest(updateProfile) : err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err.name === 'ValidationError' || err.name === 'CastError' ? new BadRequest(updateAvatar) : err);
    });
};
