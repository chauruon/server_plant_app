const express = require('express');
const User_models = require('../models/User_model');
const mongoose = require('mongoose');

const routes = express.Router();

routes.post('/',(req,res,next)=>{
    const register = new User_models({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password
    });
    register.save((err, result)=>{

    });
    res.status(200).json({
        message: 'success',
        user: register,
    })
});

// routes.post('/',(req,res,next)=>{
//     res.status(200).json({
//         message: 'success',
//     })
// });

module.exports = routes;