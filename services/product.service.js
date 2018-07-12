// Getting the Newly created Mongoose Model we just created
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const pathConfig = require('../config/path');

// Saving the context of this module inside _the letiable
_this = this;

// Async function to find the Product by Id

exports.findProductById = async function(id, fields) {
    try {
        let product = await Product.findOne({_id: id}).select(fields);
        return product;
    } catch (error) {
        throw Error('Error occured while finding Product by Id: ' + error);
    }
}

exports.findByIdOfProduct = async function(id, fields) {
    try {
        let product = await Product.findOne({id: id}).select(fields);
        return product;
    } catch (error) {
        throw Error('Error occured while finding Product by Id: ' + error);
    }
}

// Async function to get the Product List
exports.getProducts = async function(qr, key, page, limit, sort) {
    // Options setup for the mongoose paginate
    let query = qr ? JSON.parse(qr) : {};
    if (key) {
        let regExp = new RegExp(`${key}`, "i");
        query.$or = [ {id: regExp}, {name: regExp} ];
    }
    let options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 1000,
        sort: sort ? JSON.parse(sort) : {catagoryid: 'asc', createat: 'asc'}
    }
    // Try Catch the awaited promise to handle the error
    try {
        let products = await Product.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return products; 
    } catch (error) {
        // return a Error message describing the reson
        throw Error('Error while Paginate Product: ' + error);
    }
}


exports.createProduct = async function(product) {
    // Creating  a new Mongoose Object by using the new key word
    let newProduct = new Product({
        id: product.id,
        name: product.name,
        catagoryid: product.catagoryid,
        price: product.price,
        images: product.images,
        detail: product.detail,
        createby: product.createby
    });
    try {
        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (error) {     
        // return a Error message describing the reson
        throw Error('Error while creating Product: ' + error);
    }
}

exports.updateProduct = async function(product) {
    try {
        const savedProduct = await Product.findByIdAndUpdate(product._id, product);
        return savedProduct;
    } catch (error) {
        throw Error('Error occured while updating the Product: ' + error);
    }
}

exports.deleteProduct = async function(id) {
    // Delete the Product
    try {
        const deleted = await Product.remove({_id: id});
        if(deleted.n === 0) {
            throw Error('Product could not be deleted');
        }
    } catch (error) {
        throw Error('Error occured while delete the Product: ' + error);
    }
}

exports.removeProductImages = async function(fileNames) {
    for (let i = 0; i < fileNames.length; i++) {
        fs.unlink(path.join(pathConfig.PRODUCTS_IMAGE_PATH, "full_size/", fileNames[i]), function(err){
            if (err) {
                console.log(err);
            }
        });
        fs.unlink(path.join(pathConfig.PRODUCTS_IMAGE_PATH, "x720/", fileNames[i]), function(err){
            if (err) {
                console.log(err);
            }
        });
        fs.unlink(path.join(pathConfig.PRODUCTS_IMAGE_PATH, "x30/", fileNames[i]), function(err){
            if (err) {
                console.log(err);
            }
        });
    }
}
