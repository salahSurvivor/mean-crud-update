const mongoose = require('mongoose');

const trajetSchema = mongoose.Schema({
    dateC: {type: String,},
    dateD: {type: String,},
    clients: {type: String,},
    reference: {type: String,},
    numero: {type: String,},
    cmr: {type: String,},
    bool1: {type: Boolean},
    bool2: {type: Boolean},
    cmtr: {type: String}
});

const trajet = mongoose.model('trajets', trajetSchema);

module.exports = trajet;