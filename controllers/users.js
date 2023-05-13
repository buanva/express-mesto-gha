const { BadRequest, NotFound, InternalServerError } = require('../errors/MyError');
const {
  createUser,
  updateProfile,
  updateAvatar,
  userNotFound,
} = require('../errors/messages');
const { sendError } = require('../helpers/sendError');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendError(res, new BadRequest(createUser));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.getAllUsers = (_, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      sendError(res, new InternalServerError(err.message, err.name));
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound(userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        sendError(res, err);
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendError(res, new BadRequest(updateProfile));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendError(res, new BadRequest(updateAvatar));
      } else {
        sendError(res, new InternalServerError(err.message, err.name));
      }
    });
};
