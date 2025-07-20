const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

// routes/adminRoutes.js
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
    });
  } catch (error) {
    console.error("❌ Dashboard Error:", error.message); // 🔴 Log the real error
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
