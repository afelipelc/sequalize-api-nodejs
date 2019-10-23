const Sequelize = require('sequelize');
const db = require('../config/db');

const Product = require('./Product');

const OrderDetail = db.define('orderdetail', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue : 0
  }
});

OrderDetail.belongsTo(Product);

module.exports = OrderDetail;