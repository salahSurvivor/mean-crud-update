const express = require('express');
const ExpModel = require('../../models/digiparc/mixModel');
const router = express.Router();

router.get('/mix', async(req, res) => {
    try{
        const exp = await ExpModel.find({});
        res.status(200).json(exp);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/mix', async(req, res) => {
    try{
        await ExpModel.create(req.body);
        res.status(200).json('Created With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.delete('/mix/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await ExpModel.findByIdAndDelete(id);
        res.status(200).json('Deleted With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.put("/mix/:id", async(req, res) =>{
    try{
        const {id} = req.params;
        await ExpModel.findByIdAndUpdate(id, req.body);
        res.status(200).json('Updated With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

/**********Find the last id inserted**********/
router.get('/last', async(req, res) => {
    try{
        const trajet = await ExpModel.findOne().sort({_id: -1});
        const nbSplit = trajet ? trajet.numero.split('/')[0] : 0;
        res.status(200).json(nbSplit);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router; 