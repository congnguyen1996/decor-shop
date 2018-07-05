// Accessing the Service the we just created

var UserService = require('../services/users.service');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// saving the context of this module inside _the variable

_this = this;
  /* ===============
  REGISTER FUNCTION
  ================= */

  exports.register = async function(req, res, next) {

    // Check the field that must be provided

    if(!req.body.username) {
        return res.status(400).json({status: 400, message: "You must provide a username"});
    }
    if(!req.body.password) {
        return res.status(400).json({status: 400, message: "You must provide a password"});
    }
    if(!req.body.fullname) {
        return res.status(400).json({status: 400, message: "You must provide a fullname"});
    }

    //Req.body contains the form submit values
    var user = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        fullname: req.body.fullname
    }

    // Calling the Service function with the new object from the Request Body
    try {
        var createdUser = await UserService.createUser(user);
        return res.status(201).json({status: 201, data: {createdUser: createdUser}, message:"Successfully created user!"});
    } catch (error) {

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: error.message});
    }
}

  /* ========
  LOGIN FUNCTION
  ======== */
exports.login = async function(req, res, next) {
    if (!req.body.username) {
        return res.status(400).json({status: 400, message: "You must provide a username"});
    }
    if(!req.body.password) {
        return res.status(400).json({status: 400, message: "You must provide a 'password'"});
    }
    var username = req.body.username;
    var password = req.body.password;
    try {
        var user = await UserService.checkLogin(req.body.username, req.body.password);
        if(!user) {
            return res.status(200).json({status: 200, success: false, message: "Username or Email invalid"});
        }
        const token = jwt.sign({userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
        res.status(200).json({status: 200, success: true, data: { token: token, user: {username: user.username, role: user.role}}, message: "Success!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }

}

  /* ====================
  CHECK USERNAME FUNCTION
  ===================== */
  exports.checkUsername = async function (req, res, next) {
    if(!req.params.username) {
        return res.status(400).json({status: 400, message: "Username not provided"});
    }

    var username = req.params.username;
    try {
        var user = await UserService.findUserByUsername(username);
        if(user) {
            res.status(200).json({status: 200, success: false, message: "Username is already taken"});
        } else {
            res.status(200).json({status: 200, success: true, message: "Username is available"});
        }
    } catch (error) {
        res.status(400).json({status: 500, message: error.message});
    }
}

/* ================================================
MIDDLEWARE - Used to grab user's token from headers
================================================ */
exports.checkToken = async function(req, res, next) {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if(!token) {
        return res.status(400).json({status: 400, message: "No token provided"});
    }
    // Verify the token is vaild
    try {
        var decoded = await jwt.verify(token, config.secret);
        // var user = await UserService.findUserById(decoded.userId);
        req.decoded = decoded;
        next();
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message });
        }
    }

/* =================
CHECK ADMIN FUNCTION
================= */
// exports.checkAdmin = function(req, res, next) {
//     if(req.userRole !== "administrator") {
//         return res.status(200).json({status: 200, success: false, message: "User is not Administrator"});
//     }
//     res.status(200).json({status: 200, success: true, message: "You is Administrator"});
//     next();
// }

/* =================
CHECK LOGGEDIN FUNCTION
================= */
exports.checkLoggedIn = function(req, res, next) {
    if (!req.decoded) {
        return res.status(400).json({status: 400, success: false, message: "You wasn't loggedIn"});
    }
    res.status(200).json({status: 200, success: true, message: "You was loggedIn"})
}