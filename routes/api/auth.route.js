const express = require('express');

const router = express.Router();

// Getting the Controllers that we just created
const AuthController = require('../../controllers/auth.controller');

// Map each API to the Controller function
router.post('/register',[AuthController.checkToken, AuthController.register]);
router.post('/login', AuthController.login);
router.get('/check-username/:username', AuthController.checkUsername);
router.get('/check-loggedin', [AuthController.checkToken, AuthController.checkLoggedIn]);

// Export the Router
module.exports = router;