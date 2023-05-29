const clientModel = require('../../models/digiparc/clientModel');
const express = require('express');

const router = express.Router();
require('body-parser');

router.post('/clientShow', async(req, res) => {
    try{
        const clients = await clientModel.find({userName: req.body.userName});
        res.status(200).json(clients);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/client', async(req, res) => {
    try{
        await clientModel.create(req.body);
        res.status(200).json('Created With Success !!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;