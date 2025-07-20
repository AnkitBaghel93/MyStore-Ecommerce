const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// ✅ Get user's cart
router.get('/:userId', async (req, res) => {

  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.json([]);

    res.json(cart.items);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Save/update cart
router.post('/save', async (req, res) => {
  const { userId, items } = req.body;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { upsert: true, new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    console.error("SAVE CART ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
