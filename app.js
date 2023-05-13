const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { NotFound } = require('./errors/MyError');
const { pageNotFound } = require('./errors/messages');
const { sendError } = require('./helpers/sendError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((req, _, next) => {
  req.user = {
    _id: '6458dd7d23374d28b7295125',
  };

  next();
});
app.use('/', usersRouter, cardsRouter);
app.use((_, res) => {
  sendError(res, new NotFound(pageNotFound));
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
