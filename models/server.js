const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { db } = require('../database/db');
const { repairsRouter } = require('../routes/repair.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.path = {
      users: '/api/v1/users',
      repair: '/api/v1/repairs',
    };
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.path.users, usersRouter);
    this.app.use(this.path.repair, repairsRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  // todo: configurar el env, para la base de datos
  database() {
    db.authenticate()
      .then(() => {
        console.log('Database authenticated');
      })
      .catch(err => console.log(err));
    db.sync()
      .then(() => {
        console.log('Database sycend');
      })
      .catch(err => console.log(err));
  }
}

module.exports = Server;
