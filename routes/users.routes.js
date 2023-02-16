const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUser,
  findUsers,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validIfExistUser } = require('../middlewares/users.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();
router.use(protect);

router.get('/:id', validIfExistUser, findUser);

router.get('/', findUsers);

router.patch(
  '/:id',
  [
    check('username', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updateUser
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updatePassword
);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
