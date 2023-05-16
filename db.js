const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean-crud')
.then(() => {
    console.log('Connected To Mongodb');
})
.catch((err) => {
    console.log(err);
})

module.export = mongoose;

