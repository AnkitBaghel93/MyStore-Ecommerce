const Order = require('../models/order');
const User = require('../models/user');

exports.placeOrder = async (req, res) => {
  console.log("✅ Received order request:", req.body);

  try {
    const { userId, items, shippingInfo, totalAmount } = req.body;

    // Check required fields
    if (!userId || !items?.length || !shippingInfo || !totalAmount) {
      console.warn("⚠️ Missing required order fields.");
      return res.status(400).json({ message: "Missing required order details." });
    }

    const order = new Order({
      user: userId,
      items,
      shippingInfo,
      totalAmount,
    });

    const savedOrder = await order.save();
    console.log("✅ Order saved:", savedOrder);

    res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
  } catch (error) {
    console.error("❌ Error in placing order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  console.log("📥 Incoming request to get orders for user:", userId);

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    console.log(`✅ Found ${orders.length} orders for user ${userId}`);
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'fullName email') 
      .populate('items.productId', 'name price'); 
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to get orders' });
  }
};
