/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const mongoosePaginate = require('mongoose-paginate');

// Catagory Model Definition
const productSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    catagoryid: { type: String,  required: true },
    price: {
        unit: String,
        value: String
    },
    images: [String],
    detail: String,
    createby: String,
    createat: { type: Date, default: Date.now() }
  }, {
    usePushEach: true
  });

productSchema.plugin(mongoosePaginate);
// Export Module/Schema
module.exports = mongoose.model('Product', productSchema);