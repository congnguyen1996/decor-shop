const express = require('express');
const fileUpload = require('../../services/fileupload.service');
const multer = require('multer');
const uploadProductImages = multer({ storage: fileUpload.storageProductImages });

const router = express.Router();

// Getting the Controllers that we just created
const AuthController = require('../../controllers/auth.controller');
const ProductController = require('../../controllers/product.controller');

// Map each API to the Controller function
router.get('/check-product-id/:id', ProductController.checkProductId);
router.get('/get-product/:id', ProductController.getProduct);
router.get('/get', ProductController.getProducts);
router.post('/create', [AuthController.checkToken, ProductController.createProduct]);
router.put('/update', [AuthController.checkToken, ProductController.updateProduct]);
router.delete('/delete/:id', [AuthController.checkToken, ProductController.deleteProduct]);
router.post('/upload-images', [AuthController.checkToken, uploadProductImages.array('images[]', 24), ProductController.uploadProductImages]);

// Export the Router
module.exports = router;