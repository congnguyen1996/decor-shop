var multer = require('multer');
const sharp = require('sharp'); 
const path = require('path');
const fs = require('fs');
const pathConfig = require('../config/path');

exports.storageProductImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathConfig.PRODUCTS_IMAGE_PATH)
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split(".");
    newFileName = 'product_' + Date.now() + '.' + extension[extension.length-1];;
    cb(null, newFileName);
  }
})

// function to filter file of image png/jpg...
exports.fileFilterImage = function (req, file, cb){
  var type = file.mimetype; 
  var typeArray = type.split("/");
  if (typeArray[0] == "image") {
    cb(null, true);
  }else {
    cb(null, false);
  }
}

// function to resize a image jpg/png to width x height
exports.resize = function (pathInput, width, height) {
  let dirname = path.join(path.dirname(pathInput), "x" + height);
  if (!fs.existsSync(dirname)) {
    fs.mkdir(dirname);
  }
  let newPath = path.join(dirname, path.basename(pathInput));
  sharp(pathInput)
  .resize(width, height)
  .toFile(newPath, function(err, info){
    if (err) {
      throw Error('Error occured when resize file image ' + err);
    }
  });
}
