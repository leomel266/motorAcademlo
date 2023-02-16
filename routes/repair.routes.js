const { Router } = require('express');
const {
  createRepair,
  findRepair,
  findRepairs,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.use(protect);

router.get('/:id', findRepair);

router.get('/', findRepairs);

router.post('/', createRepair);

router.patch('/:id', validateFields, updateRepair);

router.delete('/:id', validateFields, deleteRepair);

module.exports = {
  repairsRouter: router,
};
