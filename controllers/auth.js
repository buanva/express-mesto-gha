const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Conflict } = require('../errors/MyError');

const {
  userNotFound, conflict,
} = require('../errors/messages');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.errors[Object.keys(err.errors)[0]].message));
      } else if (err.code === 11000) {
        next(new Conflict(conflict));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send(user);
    })
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(userNotFound) : err);
    });
};
