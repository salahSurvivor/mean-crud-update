const mongoose = require('mongoose');

const mixSchema = mongoose.Schema({
    numero: {type: String},
    dateC: {type: String},
    dateD: {type: String},
    client: {type: String},
    reference: {type: String},
    cmr: {type: String},
    bool1: {type: Boolean},
    bool2: {type: Boolean},
    cmtr: {type: String},
    expediteur: {type: Array},
    menu: Boolean,
});

const mix = mongoose.model('mix', mixSchema);

module.exports = mix;