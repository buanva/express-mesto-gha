/* eslint-disable max-classes-per-file */

module.exports.BadRequest = class BadRequest extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = code;
  }
};

module.exports.NotFound = class NotFound extends Error {
  constructor(message, code = 404) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = code;
  }
};

module.exports.InternalServerError = class InternalServerError extends Error {
  constructor(message, name, code = 500) {
    super(`Произошла неизвестная ошибка ${name}: ${message}`);
    this.name = name;
    this.statusCode = code;
  }
};
