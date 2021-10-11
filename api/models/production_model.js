const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const production = new mongoose.Schema({
    price: { 
        type: Number,
        trim: true,
        required: true
    },
    name: { 
        type: String,
        trim: true ,
        required: true
    },
    desc: { 
        type: String,
        trim: true ,
        required: true
    },
    picture:{
        type: String,
        trim: true ,
        // required: true,
    }
});
module.exports = mongoose.model('production',production);