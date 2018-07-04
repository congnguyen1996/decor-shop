var multer = require('multer');
var directoryUploadConfig = require('./directory');

exports.storageProductImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryUploadConfig.PRODUCTS_IMAGE_PATH)
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split(".");
    newFileName = 'product_' + Date.now() + '.' + extension[extension.length-1];;
    cb(null, newFileName);
  }
})

exports.fileFilterImage = function (req, file, cb){
  var type = file.mimetype; 
  var typeArray = type.split("/");
  if (typeArray[0] == "image") {
    cb(null, true);
  }else {
    cb(null, false);
  }
}
