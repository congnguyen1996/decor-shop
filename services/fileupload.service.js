const multer = require('multer');
const sharp = require('sharp'); 
const path = require('path');
const fs = require('fs');
const pathConfig = require('../config/path');

exports.storageProductImages = multer.diskStorage({
  destination: function (req, file, cb) {
    pathFile = path.join(pathConfig.PRODUCTS_IMAGE_PATH, "full_size/");
    if (!fs.existsSync(pathFile)) {
      fs.mkdir(pathFile);
    }
    cb(null, pathFile)
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;
    let extension = originalname.split(".");
    newFileName = 'product_' + Date.now() + '.' + extension[extension.length-1];;
    cb(null, newFileName);
  }
})

// function to filter file of image png/jpg...
exports.fileFilterImage = function (req, file, cb){
  let type = file.mimetype; 
  let typeArray = type.split("/");
  if (typeArray[0] == "image") {
    cb(null, true);
  }else {
    cb(null, false);
  }
}

// function to resize a image jpg/png to width x height
exports.resize = function (pathInput, width, height) {
  sharp.cache(false);
  let dirname = path.join(pathConfig.PRODUCTS_IMAGE_PATH, "x" + height);
  let newPath = path.join(dirname, path.basename(pathInput));
  sharp(pathInput)
  .resize(width, height)
  .toFile(newPath, function(err, info){
    if (err) {
      throw Error('Error occured when resize file image ' + err);
    }
  });
}
