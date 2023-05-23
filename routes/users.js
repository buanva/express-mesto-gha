const express = require('express');
const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateGetUser,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', validateGetUser, getUser);

router.patch('/users/me', validateUpdateProfile, updateUserProfile);

router.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = router;
