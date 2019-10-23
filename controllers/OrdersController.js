const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

const orderIncludes = [
  {
    model: Customer
  },
  {
  model: OrderDetail,
  as: 'details',
  include: [Product]
  }
];

const orderById = async (id) => {
  const order = await Order.findByPk(
    id,
    {
    include: orderIncludes,
  });
return order;
};

/**
 * 
 * @param {sequialize OrderDetail object} prev 
 * @param {values for update OrderDetail} current 
 * @param {number} order_id 
 */
const updateOrCreateOrderDetail = async (prev, current, order_id) => {
  if (!order_id) return;

  if (prev) {
    await prev.update({
      productId: current.productId,
      qty: current.qty
    });
  } else {
    await OrderDetail.create({
      orderId: order_id,
      productId: current.productId,
      qty: current.qty
    });
  }
};

const deleteOrderDetail = async (id) => {
  await OrderDetail.destroy({
    where: { id }
  });
};


// add Order
exports.add = async (req, res, next) => {
  console.log(req.body);
  /*
  post order:
  {
    "customerId": 1, 
    "details": [
      {
      "productId": 1,
      "qty": 2
      }
    ],
    "amount": 280
  }
  */
  
  try {
    await Order.create(
      req.body,
      {
        include: [
          {
            model: Customer
          },
          {
            model: OrderDetail,
            as: 'details'
          },
        ]
      }
    );
    res.json({ message: 'New order added' });
  } catch (error) {
    console.log(error);
    next();
  }
};


// get orders
exports.orders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: orderIncludes,
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    next();
  }
};


// get orders by customer
exports.by_customer = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.params.customer},
      include: orderIncludes,
    });

    res.json(orders);
  } catch (error) {
    console.log(error);
    next();
  }
};

// get order by :id
exports.show = async (req, res, next) => {
  try {
    const order = await orderById(req.params.id);

    if (!order) {
      res.json({
        message: 'Order doesn\'t exists'
      });
      next();
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your info'
    });
    next();
  }
};

// put: update order
exports.update = async (req, res, next) => {
  try {
    const order = await orderById(req.params.id);

    if (!order) {
      res.json({
        message: 'Order doesn\'t exists'
      });
      next();
    }

    await order.update({
        customerId: req.body.customerId || order.customerId,
        // details: req.body.details,
        amount: req.body.amount || order.amount,
      })
      .then(async () => {
        await req.body.details.forEach(async (detail) => {
          if (detail && detail.delete) {
            await deleteOrderDetail(detail.id);
          } else {
            await updateOrCreateOrderDetail(
              order.details.find(item => item.id === detail.id),
              detail,
              order.id
            );
          }
        });
        res.json({
          message: 'Order updated successfully'
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your sended info'
    });
    next();
  }
};

// delete: order
exports.delete = async (req, res, next) => {
  try {
    await Order.destroy({
      where: { id: req.params.id }
    });
    res.json({
      message: 'Order was deleted'
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your sended info'
    });
    next();
  }
};
