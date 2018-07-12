/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const mongoosePaginate = require('mongoose-paginate');

// Catagory Model Definition
const catagorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    parentid: { type: String, default: 'super-parent' }
  }, {
    usePushEach: true
  });

catagorySchema.plugin(mongoosePaginate);
// Export Module/Schema
module.exports = mongoose.model('Catagory', catagorySchema);