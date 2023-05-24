/* eslint-disable max-classes-per-file */
class MyError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }
}

module.exports.BadRequest = class BadRequest extends MyError {
  constructor(message, code = 400) {
    super(message, code);
    this.name = 'BadRequest';
  }
};

module.exports.Unauthorized = class Unauthorized extends MyError {
  constructor(message, code = 401) {
    super(message, code);
    this.name = 'Unauthorized';
  }
};

module.exports.Forbidden = class Forbidden extends MyError {
  constructor(message, code = 403) {
    super(message, code);
    this.name = 'Forbidden';
  }
};

module.exports.NotFound = class NotFound extends MyError {
  constructor(message, code = 404) {
    super(message, code);
    this.name = 'NotFound';
  }
};

module.exports.Conflict = class Conflict extends MyError {
  constructor(message, code = 409) {
    super(message, code);
    this.name = 'Conflict';
  }
};
