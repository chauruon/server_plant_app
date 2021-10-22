const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
var SHA256 = require("crypto-js/sha256");

const user_models = new mongoose.Schema({
    email: { 
        type: String,
        trim: true,
        unique:true,
        required: true
    },
    name: { 
        type: String,
        trim: true,
    },
    password: { 
        type: String,
        trim: true ,
        required: true
    },
    admin:{
        type: Boolean,
    },
});
module.exports = mongoose.model('users',user_models);