const express = require('express');
const router = express.Router();
const { placeOrder , getOrdersByUser ,getAllOrders  } = require('../controllers/OrderController');

router.post('/place', placeOrder);
router.get('/user/:userId', getOrdersByUser);
router.get('/admin/orders', getAllOrders);

module.exports = router;
