var express = require('express');

var router = express.Router();

var auth = require('./api/auth.route');
var catagory = require('./api/catagory.route');
var product = require('./api/product.route')
var user = require('./api/user.route');

router.use('/auth', auth);
router.use('/catagory', catagory);
router.use('/product', product);
router.use('/user', user);

module.exports = router;