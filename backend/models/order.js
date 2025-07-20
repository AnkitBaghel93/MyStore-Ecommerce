// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  shippingInfo: {
    fullName: String,
    email: String,
    phone: String,
    alternatePhone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    notes: String,
  },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema); // ✅ CommonJS export
