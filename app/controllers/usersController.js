const Users = require('../models/usersModule');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/users', async(req, res) => {
    try{
        const users = await Users.find({});
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

router.post('/register', async(req, res) =>{
    try{
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        }
        const user = await Users.create(data);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

/*************Login************/
router.post('/login', async(req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const users = await Users.find({});
    
    var userFound = false;
    
    users.forEach(vl => {
        if(username === vl.name && password === vl.password) {
            // Generate a JWT token
            const token = jwt.sign({id: vl._id, name: username, email: vl.email, isAdmin: vl.isAdmin }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ token });
            userFound = true;
        }
    });

    if(!userFound){
        res.status(500).json({ message: 'Invalid credentials' });
    }

});

router.put('/users/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await Users.findByIdAndUpdate(id, req.body);
        res.status(200).json('Update With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
});

router.delete('/users/:id', async(req, res) => {
    try{
        const {id} = req.params;
        await Users.findByIdAndDelete(id);
        res.status(200).json('Deleted With Success!!');
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;