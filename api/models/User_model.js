const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
var SHA256 = require("crypto-js/sha256");
const Schema = mongoose.Schema; 

const user_models = new Schema({
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
    phone: {
        type: String,
        default: ''
    },
    password: { 
        type: String,
        trim: true ,
        required: true
    },
    admin:{
        type: Boolean,
    },
    orders: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Order'
        }
    ],
    addresses: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Address'
        }
    ],
});
module.exports = mongoose.model('users',user_models);