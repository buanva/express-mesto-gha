const { MyError, InternalServerError, Conflict } = require('../errors/MyError');

const {
  conflict,
} = require('../errors/messages');
const { sendError } = require('../helpers/sendError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, _, res, _next) => {
  if (err instanceof MyError) {
    sendError(res, err);
  } else if (err.code === 11000) {
    sendError(res, new Conflict(conflict));
  } else {
    sendError(res, new InternalServerError(err.message, err.name));
  }
};
