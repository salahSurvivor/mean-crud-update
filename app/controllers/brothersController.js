const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const jsPDF = require('jspdf');
var router = express.Router();

const Brtothers = require('../models/borothersModule');
require('body-parser');

const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../front-end/src/assets/uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({
    storage: multerStorage
});

router.get('/pdf', async(req, res) => {
    try{
        const doc = new jsPDF('p', 'pt', 'letter');
        doc.text('Hello World!', 10, 10);
        doc.save('./public/example.pdf');
        res.status(200).json('Saved!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

//send Email
router.post('/contactUs', async(req, res) => {
    try{
        const API_KEY = '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';
        sgMail.setApiKey(API_KEY);

        const msg = {
            to: req.body.email,
            from: 'njsalahsn@gmail.com',
            subject: req.body.subject,
            text: req.body.text
        };

        sgMail.send(msg)
        .then(() =>{
            res.status(500).json('Email Sent');
            console.log('Email sent');
        })
        .catch((error) => {
            res.status(200).json(error);
            console.error(error);
        });        
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//Read Data
router.get('/brother', async(req, res) => {
    try{
        const product = await Brtothers.find({});
        res.status(200).json(product);

    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// Get Data By ID
router.get('/brother/:id', async(req, res) => {
    try{
        //res.status(200).json(req.body.name);
        const {id} = req.params;
        const brother = await Brtothers.findById(id);
        res.status(200).json(brother);
        
        fs.readFile('./template/template.html', (err, template) => {
            if (err) throw err;
            const output = mustache.render(template.toString(), brother);

            fs.appendFile(`./public/${id}.html`, output, (err) => {
                if (err) throw err;
                console.log('Saved!!');
            });
        });
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

// upload Image
router.post('/brotherUpload', upload.single('image'), async(req, res) => {
    try{
        res.status(200).json('Files Updated With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

// Add Data
router.post('/brother', async(req, res) => {
    try{
        const brother = await Brtothers.create(req.body);
        res.status(200).json(brother);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

// Update Data
router.put('/brother/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await Brtothers.findByIdAndUpdate(id, req.body);
        const findProduct = await Brtothers.findById(id);
        res.status(200).json(findProduct);       
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

// Delete Data
router.delete('/brother/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const brother = await Brtothers.findByIdAndDelete(id);

        if(!brother)
            res.status(200).json(`the id ${id} is not found`);
        
        else if(brother){
            const list = await Brtothers.find({});
            res.status(200).json(list);
        }    
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

module.exports = router;  

/*start upload our image
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage});
//end upload our image*/