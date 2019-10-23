const express = require('express');

const router = express.Router();

const customersController = require('../controllers/CustomersController');
const productsController = require('../controllers/ProductsController');
const ordersController = require('../controllers/OrdersController');

module.exports = function() {
  // ### Customers ###
  // post: add new customer
  router.post('/customers', customersController.add);
  // get: all customers
  router.get('/customers', customersController.list);
  // get: customer by :id
  router.get('/customers/:id', customersController.show);
  // put: update customer
  router.put('/customers/:id', customersController.update);
  // delete: customer
  router.delete('/customers/:id', customersController.delete);

  
  // ### Products ###
  // post: add new product
  router.post('/products', 
    productsController.imageUpload,
    productsController.add
  );

  
  // get: all products
  router.get('/products', productsController.list);
  // get: product by :id
  router.get('/products/:id', productsController.show);
  // put: update product
  router.put('/products/:id',
    productsController.imageUpload,
    productsController.update
  );
  // delete: product
  router.delete('/products/:id', productsController.delete);
  // find product
  router.post('/products/search/:query', productsController.search);


  // ### Orders ###
  // post: add new order
  router.post('/orders', ordersController.add);
  // get: all orders
  router.get('/orders', ordersController.orders);
  // get: product by :id
  router.get('/orders/:id', ordersController.show);
  // put: update product
  router.put('/orders/:id', ordersController.update);
  // delete: product
  router.delete('/orders/:id', ordersController.delete);
  // get: orders by customer
  router.get('/orders/by_customer/:customer', ordersController.by_customer);
  return router;
}