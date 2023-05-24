const mongoose = require('mongoose');

const expediteurSchema = mongoose.Schema({
    expediteur: {type: String},
    destinateur: {type: String},
    cmr: {type: String},
    dateChargementP: {type: String},
    retardChargement: {type: String},
    retardDeChargement: {type: String},
    idTrajet: {type: String}
})

const expediteur = mongoose.model('expediteurs', expediteurSchema);

module.exports = expediteur;