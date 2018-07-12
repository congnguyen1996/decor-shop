const express = require('express');

const router = express.Router();

// Getting the Controllers that we just created
const AuthController = require('../../controllers/auth.controller');
const CatagoryController = require('../../controllers/catagory.controller');

// Map each API to the Controller function
// router.use(AuthController.CheckToken);
router.get('/check-catagory-name/:name', CatagoryController.checkCatagoryName);
router.get('/get', CatagoryController.getCatagories);
router.post('/create', [AuthController.checkToken, CatagoryController.createCatagory]);
router.put('/update', [AuthController.checkToken, CatagoryController.updateCatagory]);
router.delete('/delete/:id', [AuthController.checkToken, CatagoryController.deleteCatagory]);

// Export the Router
module.exports = router;