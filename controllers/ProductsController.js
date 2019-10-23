const Product = require('../models/Product');
const multer = require('multer');

const multerConfig = require('../utils/multerConfig');

const upload = multer(multerConfig).single('image');

exports.imageUpload = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      res.json({
        message: error
      });
    }
    return next();
  });
};

exports.add = async (req, res) => {
  try {
    const product = req.body;
    if (req.file && req.file.filename) {
      product.image = req.file.filename;
    }
    await Product.create(product);
    res.json({
      message: 'Se agregó el producto'
    })
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error al agregar el producto' });
    next();
  }
};

exports.list = async (req, res) => {
  try{
      const products = await Product.findAll({});
      res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error obtener la lista de productos' });
    next();
  }
};

// get product by :id
exports.show = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
    res.json({
      message: 'Product doesn\'t exists'
    });
    next();
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your info'
    });
    next();
  }
};

// put: update product
exports.update = async (req, res, next) => {
  try {
    // generate new product
    const product = await Product.findByPk(req.params.id);
    //let newProduct = req.body;

    // if new image
    if(req.file && req.file.filename) {
      product.image = req.file.filename;
    }

    product.name = req.body.name;
    product.price = req.body.price;

    await product.save();

    res.json({ message: 'Product updated success' });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your sended info'
    });
    next();
  }
};

// delete: product
exports.delete = async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.params.id }
    });

    res.json({
      message: 'Product was deleted'
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error, check your sended info'
    });
    next();
  }
};

// post: query
exports.search = async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: { name: new RegExp(req.params.query, 'i')}
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error on find product'
    });
    next();
  }
};
