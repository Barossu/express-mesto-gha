const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validators');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validationUserId, getUserById);

router.patch('/me', validationUpdateProfile, updateProfile);

router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
