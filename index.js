const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//import database
const { Mongoose } = require("./db.js");
//import controller
const brothersController = require('./app/controllers/brothersController.js');
const userController = require('./app/controllers/usersController.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//apply router fro conntroller
app.use('/', brothersController);
app.use('/', userController);

//start server
app.listen(3000, () => {
    console.log('The Server On Por 3000 ...');
});

