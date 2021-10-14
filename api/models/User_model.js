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
    salt: String,

},{timestamps:true});

user_models.virtual('pass')
    .set(function(pass) {
        this._password = pass
        this.salt = uuidv1()
        console.log(SHA256("Message"));
        this.password = this.securePassword(pass)
    })
    .get(function(){
        this._password
    })

    user_models.method = {
    authenticate: function(plaiPassword) {
        return this.securePassword(plaiPassword) == this.password
    },
    securePassword: function(plaiPassword) {
        if(!plaiPassword) return "";
        try {
            var hmac = SHA256(plaiPassword,this.salt);
            console.log("SHA256: "+ hmac);
            // hmac.update(plaiPassword);
            return hmac;
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model('user',user_models);