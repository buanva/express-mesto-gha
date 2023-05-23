const defaultUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};
const regex = {
  link: /(https?:\/\/)(www\.)?([0-9a-z-]+(?:\.[a-z]+)+){1}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]+)*#?/i,
};
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
Joi.objectId = require('joi-objectid')(Joi);

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(30).default(defaultUser.about),
  }),
});

module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regex.link).default(defaultUser.avatar),
  }),
});

module.exports.validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex.link),
  }),
});

module.exports.validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

module.exports.validateLikeAction = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(30).default(defaultUser.about),
    avatar: Joi.string().regex(regex.link).default(defaultUser.avatar),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
