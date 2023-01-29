const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      name: name.toLowerCase(),
      email,
      password,
      role,
    });

    res.status(201).json({
      status: 'success',
      message: 'The product was created Successfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'Success',
    message: 'Users was found successfully',
    users,
  });
};

exports.updateUser = async (req, res) => {
  try {
    //1. OBTENGO MI ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. OBTENER LA INFORMACION A ACTUALIZAR EN LA REQ.BODY
    const { name, email } = req.body;
    //3. BUSCAR EL PRODUCTO A ACTUALIZAR DE LA REQ.PARAMS
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    //4. SI NO EXISTE EL PRODUCTO, ENVIAMOS EL ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The product was no found',
      });
    }

    //5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO ENCONTRADO
    const updateUser = await user.update({
      name,
      email,
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'The product has been updated',
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR EL PRODUCTO A ELIMINAR
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    //3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was no found',
      });
    }

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'The user was found Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
