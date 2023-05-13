module.exports.sendError = (res, { statusCode, message }) => {
  res.status(statusCode).send({ message });
};
