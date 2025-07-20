import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';


const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("📦 Token being used:", token);

      const res = await axios.get(`${BACKEND_URL}/api/orders/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Orders fetched successfully:", res.data);
      setOrders(res.data);

      // Debug each order's items
      res.data.forEach((order, idx) => {
        console.log(`📄 Order #${idx + 1}:`, order);
        console.log("  ↪ User:", order.user);
        console.log("  ↪ Items:", order.items);
        order.items.forEach((item, i) => {
          console.log(`    • Item ${i + 1}:`, item);
        });
      });
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      if (error.response) {
        console.error("🧾 Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 text-left">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-bold">{index + 1}</td>
                    <td className="py-3 px-4">{order.user?.fullName || 'N/A'}</td>
                    <td className="py-3 px-4">{order.user?.email}</td>
                    <td className="py-3 px-4">₹{order.totalAmount}</td>
                    <td className="py-3 px-4">{order.status || 'Pending'}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td colSpan="6" className="py-2 px-4">
                      <strong className="block mb-1 text-gray-800">Items:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {/* Debugging fallback */}
                            {item.productId?.name || item.name || 'Unnamed'} — ₹
                            {item.productId?.price || item.price || 'N/A'} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
