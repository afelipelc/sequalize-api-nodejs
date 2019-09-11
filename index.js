const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración y Modelos BD
const db = require('./config/db');
    require('./models/Customer');

// ésto hace que se sincronice la estructura de los models (tablas) importados ok ok ok goood
// de lo contrario se produce: no existe la tabla customers, etc
db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

// create server
const app = express();

// eneable bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS
app.use(cors());

// app routes
app.use('/', routes());

// public folder
// app.use(express.static('uploads'));

// server port
app.listen(5000);