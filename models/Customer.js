const Sequelize = require('sequelize');
const db = require('../config/db');

const Customers = db.define('customer', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement : true
  },
  name : Sequelize.STRING(24),
  lastname : Sequelize.STRING(24),
  email: {
    type: Sequelize.STRING(30),
    allowNull: false, 
    validate: {
        isEmail: { msg : 'Agrega un email válido'}
    },
    unique : {
        args: true,
        msg : 'Usuario ya registrado'
    }
  },
  business : Sequelize.STRING(48),
  phone : Sequelize.STRING(16),
  },
  {
    timestamps : false
  }
);


module.exports = Customers;