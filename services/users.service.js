// Getting the Newly created Mongoose Model we just created
var User = require('../models/user');

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
        fullname: user.fullname
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
    var id = user.id;
    try {
        // Find the old User Object by ID
        var oldUser = await User.findById(id);
    } catch (error) {
        throw Error('Error occured while Finding the User: ' + error);
    }
    // If no old User Object exists return false
    if(!oldUser) {
        return false;
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
        var savedUser = await oldUser.save();
        return savedUser;
    } catch (error) {
        throw Error('Error occured while updating the User: ' + error);
    }
}

exports.deleteUser = async function(id) {
    // Delete the User
    try {
        var deleted = await User.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the User: ' + error);
    }
}
