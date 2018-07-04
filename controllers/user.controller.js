// Accessing the Service the we just created

var UserService = require('../services/users.service');

// saving the context of this module inside _the variable

_this = this;


exports.getUsers = async function(req, res, next) {
    try {
        const users = await UserService.getUsers(req.query.query, parseInt(req.query.page), req.query.limit, req.query.sort);
        res.status(200).json({status: 200, data: users, message: "Successfully get list user!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}


exports.updateUser = async function(req, res, next) {
    var user = {
        _id: req.body._id,
        fullname: req.body.name ? req.body.name : null
    }
    try {
        var updatedUser = await UserService.updateUser(user);
        res.status(201).json({status: 201, data: updatedUser, message: "Successfully updated user!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.changePassword = async function(req, res, next) {
    if (!req.body.password) {
        return res.status(400).json({status: 400, message: "Password is not provided"});
    }
    var user = {
        _id: req.body._id,
        password: req.body.password
    }
    try {
        var updatedUser = await UserService.updateUser(user);
        res.status(201).json({status: 201, data: updatedUser, message: "Successfully changed user's password!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.deleteUser = async function(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({status: 400, message: "User id must be present"});
    }
    try {
        await UserService.deleteUser(req.params.id);
        return res.status(200).json({status: 200, message: "The user is deleted!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}