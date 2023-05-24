const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//import database
const { Mongoose } = require("./db.js");
//import controller
const brothersController = require('./app/controllers/brothersController.js');
const userController = require('./app/controllers/usersController.js');
const clientController = require('./app/controllers/digiparc/clientController.js');
const expeController = require('./app/controllers/digiparc/expeController.js')
const trajetController = require('./app/controllers/digiparc/trajetController.js')
const mixController = require('./app/controllers/digiparc/mixController.js')

const app = express();
app.use(bodyParser.json());
app.use(cors());

//apply router fro conntroller
app.use('/', brothersController);
app.use('/', userController);
app.use('/', clientController);
app.use('/', expeController);
app.use('/', trajetController);
app.use('/', mixController);

//start server
app.listen(3000, () => {
    console.log('The Server On Por 3000 ...');
});

