const express = require('express');
const user = require("../controllers/user");
const production = require("../controllers/production");
const router = express.Router();

// info user
router.post('/signup',user.signup);
router.post('/signin',user.SingIn);

// production
router.post('/create_product',production.create_product);
router.get('/get_product',production.get_product);
router.post('/delete_product',production.delete_product);

module.exports = router