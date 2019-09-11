// importar el model Customer
const Customer = require('../models/Customer');

// add customer
exports.add = async (req, res, next) => {
  console.log(req.body);
  try {
    // crear un cliente con los datos
    // recibidos
    // se almacena el cliente
    await Customer.create(req.body);

    res.json({ message: 'Se agregó el cliente' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error al agregar el cliente' });
    next();
  }
};

// acción para listar clientes
exports.list = async (req, res, next) => {
  try {
    // extraer la lista de clientes
    const customers = await Customer.findAll({});
    res.json(customers);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error al leer clientes'
    });
    next(); // terminar de ejecutar la función
  }
};


// acción para leer un cliente
exports.show = async (req, res, next) => {
  try {
    // buscar el cliente por ID
    //req.params.id es el parámetro recibido
    //  http://localhost/customers/IDCLIENTE
    const customer = await Customer.findByPk(req.params.id);
    // validar si existe el cliente
    if (!customer) {
      res.json({
        message: 'No existe el cliente'
      });
      next();
    } 

    // enviar el cliente
    res.json(customer);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error al leer cliente'
    });
    next();
  }
};

// acción para actualizar cliente
exports.update = async (req, res) => {
  try {
    // buscar cliente por ID
    const customer = await Customer.findByPk(req.params.id);
    /*req.sanitizeBody('name');
    req.sanitizeBody('lastname');
    req.sanitizeBody('email');*/
    // actualizar campos
    const { name, lastname, email, phone, company } = req.body;
    customer.name = name;
    customer.lastname = lastname;
    customer.email = email;
    customer.phone = phone;
    customer.company = company;

    // devuelve el cliente actualizado
    await customer.save();

    res.json({
      message: 'Cliente actualizado correctamente'
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error al actualizar cliente'
    });
    next();
  }
};


// accción para eliminar cliente
exports.delete = async (req, res, next) => {
  try {
    // buscar cliente por id
    // eliminar cliente encontrado
    await Customer.destroy({
      where: { id: req.params.id }
    });

    // enviar mensaje
    res.json({
      message: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error al eliminar cliente'
    });
    next();
  }
};
