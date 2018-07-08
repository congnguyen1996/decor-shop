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
        fullname: req.body.fullname ? req.body.fullname : null,
        role: req.body.role ? req.body.role : null
    }
    try {
        var oldUser =  await UserService.findUserById(req.body._id);
        var admin = await UserService.findUserById(req.decoded.userId);
        if (!admin || admin.role !== "0" || !oldUser || oldUser.role === "0") {
            return res.status(400).json({status: 400, message: "You have NO this permission!"});
        }
        var updatedUser = await UserService.updateUser(user);
        res.status(201).json({status: 201, data: updatedUser, message: "Successfully updated user!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.updatePassword = async function(req, res, next) {
    if (!req.body.oldpw) {
        return res.status(400).json({status: 400, message: "Old password is not provided"});
    }
    if (!req.body.newpw) {
        return res.status(400).json({status: 400, message: "New password is not provided"});
    }
    if (req.body.oldpw === req.body.newpw) {
        return res.status(400).json({status: 400, message: "New password is the same old password"});
    }
    try {
        var updatedUser = await UserService.updatePassword(req.decoded.userId, req.body.oldpw, req.body.newpw);
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
        var oldUser =  await UserService.findUserById(req.params.id);
        var admin = await UserService.findUserById(req.decoded.userId);
        if (!admin || admin.role !== "0" || oldUser.role === "0") {
            return res.status(400).json({status: 400, message: "You have NO this permission!"});
        }
        await UserService.deleteUser(req.params.id);
        return res.status(200).json({status: 200, message: "The user is deleted!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}