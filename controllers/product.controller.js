// Accessing the Service the we just created

const ProductService = require('../services/product.service');
const FileUpload = require('../services/fileupload.service');

exports.checkProductId = async function (req, res, next) {
    if(!req.params.id) {
        return res.status(400).json({status: 400, message: "Product id not provided"});
    }
    try {
        const product = await ProductService.findByIdOfProduct(req.params.id)
        if(product) {
            res.status(200).json({status: 200, success: false, message: "Product id is already taken"});
        } else {
            res.status(200).json({status: 200, success: true, message: "Product id is available"});
        }
    } catch (error) {
        res.status(400).json({status: 500, message: error.message});
    }
}


exports.getProduct = async function (req, res, next) {
    if(!req.params.id) {
        return res.status(400).json({status: 400, message: "Product id not provided"});
    }
    try {
        const product = await ProductService.findProductById(req.params.id)
        return res.status(200).json({status: 200, data: product, message: "Successfully get product"});
    } catch (error) {
        res.status(400).json({status: 500, message: error.message});
    }
}

exports.getProducts = async function(req, res, next) {
    try {
        const products = await ProductService.getProducts(req.query.query, req.query.key, req.query.page, req.query.limit, req.query.sort);
        res.status(200).json({status: 200, data: products, message: "Successfully get list product!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}


exports.createProduct = async function(req, res, next) {
    if (!req.body.id) {
        return res.status(400).json({status: 400, message: "You must provide a product's id"});
    }
    if (!req.body.name) {
        return res.status(400).json({status: 400, message: "You must provide a product's name"});
    }
    if (!req.body.catagoryid) {
        return res.status(400).json({status: 400, message: "You must provide a catagory's id of product"});
    }
    if (!req.body.images) {
        return res.status(400).json({status: 400, message: "You must provide a product's images"});
    }
    let product = {
        id: req.body.id,
        name: req.body.name,
        catagoryid: req.body.catagoryid,
        price: {
            unit: req.body.priceunit,
            value: req.body.pricevalue
        },
        images: req.body.images,
        detail: req.body.detail,
        createby: req.decoded.userId
    }
    try {
        const createdProduct = await ProductService.createProduct(product);
        res.status(201).json({status: 201, data: createdProduct, message: "Successfully created product!"});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.updateProduct = async function(req, res, next) {
    let product = {
        _id: req.body._id,
        id: req.body.id,
        name: req.body.name,
        catagoryid: req.body.catagoryid,
        price: {
            unit: req.body.priceunit,
            value: req.body.pricevalue,
        },
        images: req.body.images,
        detail: req.body.detail
    }
    
    try {
        let delImages = [];
        const oldProduct = await ProductService.findProductById(product._id);
        for (let i = 0; i < oldProduct.images.length; i++) {
            if (!product.images.includes(oldProduct.images[i])) {
                delImages.push(oldProduct.images[i]); 
            }
        }
        const updatedProduct = await ProductService.updateProduct(product);
        res.status(201).json({status: 201, data: updatedProduct, message: "Successfully updated product!"});
        if (delImages.length > 0) {
            ProductService.removeProductImages(delImages);
        }
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.deleteProduct = async function(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({status: 400, message: "Product id must be present"});
    }
    try {
        const product = await ProductService.findProductById(req.params.id);
        if (!product) {
            return res.status(400).json({status: 400, message: "No product is found"});
        }
        await ProductService.deleteProduct(req.params.id);
        res.status(200).json({status: 200, message: "The product is deleted!"});
        return ProductService.removeProductImages(product.images);
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
}

exports.uploadProductImages = async function(req, res, next) {
    if (!req.files) {
        return res.status(500).json({status: 500, message: "Error when uploading file"});
    }
    if (req.files.length == 0) {
        return res.status(500).json({status: 500, message: "No file uploaded"});
    }
    let files = Array.from(req.files);
    let images = [];
    for (let i = 0; i < files.length; i++) {
        images.push(files[i].filename);
        FileUpload.resize(files[i].path, null, 720);
        FileUpload.resize(files[i].path, null, 30);

    }
    res.status(200).json({status: 200, data: images, message: "Successfully uploaded file!"});
}