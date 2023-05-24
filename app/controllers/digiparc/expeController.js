const express = require('express');
const ExpModel = require('../../models/digiparc/expediteur');
const router = express.Router();

router.get('/exp', async(req, res) => {
    try{
        const exp = await ExpModel.find({});
        res.status(200).json(exp);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/exp', async(req, res) => {
    try{
        await ExpModel.create(req.body);
        res.status(200).json('Created With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.delete('/exp/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await ExpModel.deleteOne({idTrajet: id});
        res.status(200).json('Deleted With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

module.exports = router;    