const defaultUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};
const { celebrate, Joi } = require('celebrate');

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(30).default(defaultUser.about),
  }),
});

module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().default(defaultUser.avatar),
  }),
});

module.exports.validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports.validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
});

module.exports.validateLikeAction = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(30).default(defaultUser.about),
    avatar: Joi.string().default(defaultUser.avatar),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
