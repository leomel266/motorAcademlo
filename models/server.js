const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { db } = require('../database/db');
const { repairsRouter } = require('../routes/repair.routes');
const morgan = require('morgan');
const glabalErrorHandler = require('../controllers/error.controller');
const { authRouter } = require('../routes/auth.routes');
const initModel = require('./initModel');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.path = {
      users: '/api/v1/users',
      repair: '/api/v1/repairs',
      auth: '/api/v1/auth',
    };
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Hola, estoy en desarrollo');
      this.app.use(morgan('dev'));
    }

    if (process.env.NODE_ENV === 'production') {
      console.log('Hola, estoy en produccion');
    }
    // Utilizamos las cors para permitir el acceso a la api
    this.app.use(cors());

    // Utilizamos express.json para parsear el body de la request
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.path.users, usersRouter);
    this.app.use(this.path.repair, repairsRouter);
    this.app.use(this.path.auth, authRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(glabalErrorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  database() {
    db.authenticate()
      .then(() => {
        console.log('Database authenticated');
      })
      .catch(err => console.log(err));

    // Relations
    initModel();

    db.sync()
      .then(() => {
        console.log('Database sycend');
      })
      .catch(err => console.log(err));
  }
}

module.exports = Server;
