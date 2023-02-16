const Repair = require('../models/repair.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!repair) {
    return next(new AppError('Repair not found ', 404));
  }
  req.repair = repair;
  next();
});
