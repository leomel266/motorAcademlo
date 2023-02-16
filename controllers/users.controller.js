const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The users found were Successfully',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The user was found Successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, email } = req.body;

  //5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO ENCONTRADO
  const updateUser = await user.update({
    username,
    email,
  });
  //6. ENVIO LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'The product has been updated',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  //4. ACTUALIZAR EL ESTADO DEL PRODUCTO FALSE
  await user.update({
    status: false,
  });
  // await product.destroy() para eliminar

  //5. ENVIAR RESPUESTA AL CLIENTE
  res.json({
    status: 'success',
    message: 'The user has been deleted successfully',
    id,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfully',
  });
});
