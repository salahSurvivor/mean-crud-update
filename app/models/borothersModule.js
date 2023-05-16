const mongoose = require('mongoose');

var Mongoose = mongoose.model('brothers', {
    name: {type: String},
    job: {type: String},
    age: {type: Number},
    image: {type: String},
    date: {type: Date},
    gender: {type: String}
});

module.exports = Mongoose;