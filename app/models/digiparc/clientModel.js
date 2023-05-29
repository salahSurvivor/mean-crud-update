const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

const client = mongoose.model('clients', clientSchema);
module.exports = client;