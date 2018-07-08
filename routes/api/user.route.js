var express = require('express');

var router = express.Router();

// Getting the Controllers that we just created
var UserController = require('../../controllers/user.controller');
var AuthController = require('../../controllers/auth.controller');

// Map each API to the Controller function
router.get('/get', UserController.getUsers);
router.put('/update-pw', [AuthController.checkToken, UserController.updatePassword]);
router.put('/update', [AuthController.checkToken, UserController.updateUser]);
router.delete('/delete/:id', [AuthController.checkToken, UserController.deleteUser]);
// Export the Router
module.exports = router;