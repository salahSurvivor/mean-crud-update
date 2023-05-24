const express = require('express');
const router = express.Router();
const TrajetModel = require('../../models/digiparc/trajetModel');

router.get('/trajet', async(req, res) => {
    try{
        const trajets = await TrajetModel.find({});
        res.status(200).json(trajets);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/trajet', async(req, res) => {
    try{
        const trajet = await TrajetModel.create(req.body);
        res.status(200).json(trajet);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.put('/trajet/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const trajet = await TrajetModel.findByIdAndUpdate(id, req.body);
        res.status(200).json(trajet);
    }
    catch(err){
        res.status(200).json(err.message);
    }
});

router.delete('/trajet/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await TrajetModel.findByIdAndDelete(id);
        res.status(200).json('Deleted With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

/**********Find the last id inserted**********/
router.get('/lastTrajet', async(req, res) => {
    try{
        const trajet = await TrajetModel.findOne().sort({_id: -1});
        const nbSplit = trajet.numero.split('/')[0];
        res.status(200).json(nbSplit);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;