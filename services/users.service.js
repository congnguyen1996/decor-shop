// Getting the Newly created Mongoose Model we just created
const User = require('../models/user');

// Async function to find the User by Id
exports.findUserById = async function(id, fields) {
    try {
        const user = await User.findOne({_id: id}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by Id: ' + error);
    }
}

// Async function to find the User by username
exports.findUserByUsername = async function(username, fields) {
    try {
        const user = await User.findOne({username: username}).select(fields);
        return user;
    } catch (error) {
        throw Error('Error occured while finding User by username: ' + error);
    }
}

// Async function to check username and password in User List
exports.checkLogin = async function(username, password) {
    try {
        const user = await User.findOne({username: username});
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
exports.getUsers = async function(qr, page, limit, sort) {
    // Try Catch the awaited promise to handle the error
    try {
        // Options setup for the mongoose paginate
        let query = qr ? JSON.parse(qr) : {};
        let options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 1000,
            sort: sort ? JSON.parse(sort) : {username: 'asc'}
        }
        const users = await User.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return users; 
    } catch (error) {
        // return a Error message describing the reson
        throw Error('Error while Paginate User: ' + error);
    }
}

exports.createUser = async function(user) {
    // Creating  a new Mongoose Object by using the new key word
    let newUser = new User({
        username: user.username,
        password: user.password,
        fullname: user.fullname,
        role: user.role
    });
    // Saving the user
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {     
        // return a Error message describing the reson
        console.log('' + error);
        throw Error('Error while creating User: ' + error);
    }
}

exports.updateUser = async function(user) {
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, user);
        return updatedUser;
    } catch (error) {
        throw Error('Error occured while updating the User: ' + error);
    }
}

exports.updatePassword = async function(userId, oldpw, newpw) {
    try {
        let user = await User.findById(userId);
        if (!user.comparePassword(oldpw)) {
            throw String('Old password incorrect!');
        } else {
            user.password = newpw;
            const updatedUser = await user.save();
            return updatedUser;
        }
    } catch (error) {
        throw Error(error);
    }
}

exports.deleteUser = async function(id) {
    // Delete the User
    try {
        const deleted = await User.remove({_id: id});
        if(deleted.n === 0) {
            throw String('User could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the User: ' + error);
    }
}
