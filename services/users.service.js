// Getting the Newly created Mongoose Model we just created
var User = require('../models/user');
// var ObjectId = require('m')

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the User by Id

exports.findUserById = async function(id, fields) {
    try {
        var user = await User.findOne({_id: id}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by Id: ' + error);
    }
}


// Async function to find the User by username

exports.findUserByUsername = async function(username, fields) {
    try {
        var user = await User.findOne({username: username}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by username: ' + error);
    }
}

// Async function to check username and password in User List
exports.checkLogin = async function(username, password) {
    try {
        var user = await User.findOne({username: username});
        if(!user) {
            return null;
        } else if(!user.comparePassword(password)) {
            return null;
        }
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by username: ' + error);
    }
}

// Async function to get the User List
exports.getUsers = async function(query, page, limit, sort) {
    // Try Catch the awaited promise to handle the error
    try {
        // Options setup for the mongoose paginate
        var query = query ? JSON.parse(query) : {};
        var options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 1000,
            sort: sort ? JSON.parse(sort) : {username: 'asc'}
        }
        var users = await User.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return users; 
    } catch (error) {
        // return a Error message describing the reson
        throw Error('Error while Paginate User: ' + error);
    }
}

exports.createUser = async function(user) {
    // Creating  a new Mongoose Object by using the new key word
    var newUser = new User({
        username: user.username,
        password: user.password,
        fullname: user.fullname,
        role: user.role
    });
    // Saving the user
    try {
        var savedUser = await newUser.save();
        return savedUser;
    } catch (error) {     
        // return a Error message describing the reson
        console.log('' + error);
        throw Error('Error while creating User: ' + error);
    }
}

exports.updateUser = async function(user) {
    try {
        // Find the old User Object by ID
        var oldUser = await User.findById(user._id);
    } catch (error) {
        throw Error('Error occured while Finding the User: ' + error);
    }
    // If no old User Object exists return false
    if(!oldUser) {
        throw Error('Something wrong: ' + error);
    }
    // Edit the oldUser Object
    if (user.username) {
        oldUser.username = user.username;
    }
    if (user.password) {
        oldUser.password = user.password;
    }
    if (user.role) {
        oldUser.role = user.role;
    }
   
    try {
        var updatedUser = await oldUser.update();
        return updatedUser;
    } catch (error) {
        throw Error('Error occured while updating the User: ' + error);
    }
}

exports.updatePassword = async function(userId, oldpw, newpw) {
    try {
        var user = await User.findById(userId);
        if (!user.comparePassword(oldpw)) {
            throw String('Old password incorrect!');
        }
        user.password = newpw;
        var updatedUser = await user.save();
        return updatedUser;
    } catch (error) {
        throw Error(error);
    }
}

exports.deleteUser = async function(id) {
    // Delete the User
    try {
        var deleted = await User.remove({_id: id});
        if(deleted.n === 0) {
            throw String('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the User: ' + error);
    }
}
