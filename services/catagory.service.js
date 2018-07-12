// Getting the Newly created Mongoose Model we just created
const Catagory = require('../models/catagory');

// Async function to find the Catagory by Id
exports.findCatagoryById = async function(id, fields) {
    try {
        const catagory = await Catagory.findOne({_id: id}).select(fields);
        return catagory;
    } catch (error) {
        throw Error('Error occured while finding Catagory by Id: ' + error);
    }
}

// Async function to find the User by username
exports.findUserByName = async function(name, fields) {
    try {
        const catagory = await Catagory.findOne({name: name}).select(fields);
        return catagory;
    } catch (error) {
        throw Error('Error occured while finding Catagory by name: ' + error);
    }
}

exports.findUserByName = async function(name, fields) {
    try {
        const catagory = await Catagory.findOne({name: name}).select(fields);
        return catagory;
    } catch (error) {
        throw Error('Error occured while finding Catagory by name: ' + error);
    }
}

// Async function to get the Catagory List
exports.getCatagories = async function(qr, page, limit, sort) {
    // Try Catch the awaited promise to handle the error
    try {
        // Options setup for the mongoose paginate
        let query = qr ? JSON.parse(qr) : {};
        let options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 1000,
            sort: sort ? JSON.parse(sort) : {name: 'asc'}
        }
        const catagories = await Catagory.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return catagories; 
    } catch (error) {
        // return a Error message describing the reson
        throw Error('Error while Paginate Catagory: ' + error);
    }
}

exports.createCatagory = async function(catagory) {
    // Creating  a new Mongoose Object by using the new key word
    let newCatagory = new Catagory({
        name: catagory.name,
        parentid: catagory.parentid
    });
    try {
        const saveCatagory = await newCatagory.save();
        return saveCatagory;
    } catch (error) {     
        // return a Error message describing the reson
        throw Error('Error while creating Catagory: ' + error);
    }
}

exports.updateCatagory = async function(catagory) {
    try {
        let savedCatagory = await Catagory.findByIdAndUpdate(catagory._id, catagory);
        return savedCatagory;
    } catch (error) {
        throw Error('Error occured while updating the Catagory: ' + error);
    }
}

exports.deleteCatagory = async function(id) {
    // Delete the Catagory
    try {
        const deleted = await Catagory.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('Catagory could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Catagory: ' + error);
    }
}
