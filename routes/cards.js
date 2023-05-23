const express = require('express');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validateDeleteCard,
  validateLikeAction,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/cards', getAllCards);

router.post('/cards', validateCreateCard, createCard);

router.delete('/cards/:cardId', validateDeleteCard, deleteCard);

router.put('/cards/:cardId/likes', validateLikeAction, likeCard);

router.delete('/cards/:cardId/likes', validateLikeAction, dislikeCard);

module.exports = router;
