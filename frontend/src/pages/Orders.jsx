import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData._id) {
      setUserId(userData._id);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${BACKEND_URL}/api/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="mb-4">
                <p className="text-gray-600"><strong>Order ID:</strong> {order._id}</p>
                <p className="text-gray-600"><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p className="text-gray-600"><strong>Total:</strong> ₹{order.totalAmount}</p>
              </div>

              <div>
                <p className="font-medium mb-2">Items:</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 border p-3 rounded">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                        <p className="text-sm text-gray-700">Subtotal: ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
