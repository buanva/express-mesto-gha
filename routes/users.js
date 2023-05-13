const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUserProfile);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
