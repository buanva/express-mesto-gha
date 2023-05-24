// eslint-disable-next-line no-unused-vars
module.exports = (err, _, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? `Произошла неизвестная ошибка ${err.name}: ${err.message}` : err.message;
  res.status(statusCode).send({ message });
};
