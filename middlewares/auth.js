const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/MyError');

const {
  needAuthorize,
} = require('../errors/messages');

module.exports = (req, _, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new Unauthorized(needAuthorize));
    return;
  }

  try {
    req.user = jwt.verify(token, 'some-secret-key');
    next();
  } catch (err) {
    next(new Unauthorized(needAuthorize));
  }
};
