const { Router } = require('express');
const {
  createRepair,
  findRepair,
  findRepairs,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = Router();

router.get('/:id', findRepair);

router.get('/', findRepairs);

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
