const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, userId, motorsNumber, description } = req.body;

  const newRepair = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });
  return res.status(201).json({
    status: 'success',
    message: 'The repair was created successfully',
    newRepair,
  });
});

exports.findRepairs = catchAsync(async (req, res, netx) => {
  const repairs = await Repair.findAll({
    attributes: ['id', 'motorsNumber'],
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['createAt', 'updateAt', 'status'] },
        where: {
          status: true,
        },
      },
    ],
  });
  return res.status(200).json({
    status: 'Success',
    message: 'Repairs was found successfully',
    repairs,
  });
});

exports.updateRepair = async (req, res) => {
  const { repair } = req;

  const updateRepair = await repair.update({
    status: 'completed',
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The repair has been updated',
    updateRepair,
  });
};

exports.deleteRepair = async (req, res) => {
  //1. OBTENGO EL ID DE LA REQ.PARAMS
  const { repair } = req;
  //2. BUSCAR EL PRODUCTO A ELIMINAR

  //4. ACTUALIZAR EL ESTADO DEL PRODUCTO FALSE
  await repair.update({
    status: 'cancelled',
  });
  // await product.destroy() para eliminar

  //5. ENVIAR RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'success',
    message: 'The repair has been deleted successfully',
    id,
  });
};

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The repair was found Successfully',
    repair,
  });
});
