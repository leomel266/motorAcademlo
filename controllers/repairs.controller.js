const Repair = require('../models/repair.model');

exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repair.create({
      date,
      userId,
    });
    res.status(201).json({
      status: 'success',
      message: 'ROUTE - POST desde el controlador',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });
    res.status(200).json({
      status: 'Success',
      message: 'Repairs was found successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }
    const updateRepair = await repair.update({
      name,
      email,
    });
    res.json({
      status: 'Success',
      message: 'Method User Login',
      updateRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR EL PRODUCTO A ELIMINAR
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    //3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was no found',
      });
    }

    //4. ACTUALIZAR EL ESTADO DEL PRODUCTO FALSE
    await repair.update({
      status: 'completed',
    });
    // await product.destroy() para eliminar

    //5. ENVIAR RESPUESTA AL CLIENTE
    res.json({
      status: 'success',
      message: 'The repair has been deleted successfully',
      id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'The repair was found Successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
