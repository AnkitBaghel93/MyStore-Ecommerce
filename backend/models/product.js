const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  description: String,
  image: String, // URL or Cloudinary public ID
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
