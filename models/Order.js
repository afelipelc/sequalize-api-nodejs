const Sequelize = require('sequelize');
const db = require('../config/db');

const OrderDetail = require('./OrderDetail');
const Customer = require('./Customer');

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  amount: {
    type: Sequelize.DECIMAL,
    defaultValue : 0.0
  }
});

Order.belongsTo(Customer);
Order.hasMany(OrderDetail, {as: 'details', onDelete: 'cascade'});

module.exports = Order;
