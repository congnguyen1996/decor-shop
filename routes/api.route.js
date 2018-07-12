const express = require('express');

const router = express.Router();

const auth = require('./api/auth.route');
const catagory = require('./api/catagory.route');
const product = require('./api/product.route')
const user = require('./api/user.route');

router.use('/auth', auth);
router.use('/catagory', catagory);
router.use('/product', product);
router.use('/user', user);

module.exports = router;