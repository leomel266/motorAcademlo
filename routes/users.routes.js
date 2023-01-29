const { Router } = require('express');
const {
  createUser,
  findUser,
  findUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('/:id', findUser);

router.get('/', findUsers);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
