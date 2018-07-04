// Getting the Newly created Mongoose Model we just created
var Product = require('../models/product');
var fs = require('fs');
var directoryConfig = require('../config/directory');

// Saving the context of this module inside _the variable
_this = this;

// Async function to find the Catagory by Id

exports.findProductById = async function(id, fields) {
    try {
        var product = await Product.findOne({_id: id}).select(fields);
        return product;
    } catch (error) {
        throw Error('Error occured while finding Product by Id: ' + error);
    }
}

exports.findByIdOfProduct = async function(id, fields) {
    try {
        var product = await Product.findOne({id: id}).select(fields);
        return product;
    } catch (error) {
        throw Error('Error occured while finding Product by Id: ' + error);
    }
}

// Async function to get the Catagory List
exports.getProducts = async function(query, page, limit, sort) {
    // Options setup for the mongoose paginate
    var query = query ? JSON.parse(query) : {};
    var options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 1000,
        sort: sort ? JSON.parse(sort) : {catagoryid: 'asc'}
    }
    // Try Catch the awaited promise to handle the error
    try {
        var products = await Product.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return products; 
    } catch (error) {
        // return a Error message describing the reson
        throw Error('Error while Paginate Product: ' + error);
    }
}

exports.createProduct = async function(product) {
    // Creating  a new Mongoose Object by using the new key word
    var newProduct = new Product({
        id: product.id,
        name: product.name,
        catagoryid: product.catagoryid,
        price: product.price,
        images: product.images,
        detail: product.detail,
        createby: product.createby
    });
    try {
        var saveProduct = await newProduct.save();
        return saveProduct;
    } catch (error) {     
        // return a Error message describing the reson
        throw Error('Error while creating Product: ' + error);
    }
}

exports.updateProduct = async function(product) {
    var id = product.id;
    try {
        // Find the old Product Object by ID
        var oldProduct = await Product.findOne({id: id});
        // update the old Product
        if (product.id) {
            oldProduct.id = id;
        }
        if (product.name) {
            oldProduct.name = product.name;
        }
        if (product.catagoryid) {
            oldProduct.catagoryid = product.catagoryid;
        }
        if (product.price) {
            oldProduct.price = product.price;
        }
        if (product.images) {
            oldProduct.images = product.images;
        }
        if (product.detail) {
            oldProduct.detail = product.detail;
        }
        var savedProduct = await oldProduct.save();
        return savedProduct;
    } catch (error) {
        throw Error('Error occured while updating the Product: ' + error);
    }
}

exports.deleteProduct = async function(id) {
    // Delete the Product
    try {
        var deleted = await Product.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('Product could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Product: ' + error);
    }
}

exports.removeProductImages = async function(fileNames) {
    for(let i = 0; i < fileNames.length; i++) {
       fs.unlinkSync(directoryConfig.PRODUCTS_IMAGE_PATH + fileNames[i]);
    }
}
