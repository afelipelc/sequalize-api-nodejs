const Sequelize = require('sequelize');
const db = require('../config/db');

const Product = db.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING(24),
    price: Sequelize.DECIMAL,
    image: Sequelize.STRING(64)
  },
  {
    timestamps: false
  }
);

module.exports = Product;
