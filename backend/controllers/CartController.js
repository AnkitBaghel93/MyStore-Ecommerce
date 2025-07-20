// controllers/cartController.js
const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId });
  res.json(cart?.items || []);
};

exports.saveCart = async (req, res) => {
  const { userId, items } = req.body;
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = items;
  } else {
    cart = new Cart({ userId, items });
  }
  await cart.save();
  res.status(200).json({ message: 'Cart saved' });
};
