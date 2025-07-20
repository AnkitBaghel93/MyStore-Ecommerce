import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../../config';

import axios from 'axios';
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/admin/dashboard-stats`);
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <FaBoxOpen className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-600">Total Products</p>
            <h3 className="text-xl font-bold">{stats.totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <FaShoppingCart className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-600">Total Orders</p>
            <h3 className="text-xl font-bold">{stats.totalOrders}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <FaRupeeSign className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-600">Total Revenue</p>
            <h3 className="text-xl font-bold">₹{stats.totalRevenue}</h3>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-4 px-6 rounded-xl text-center shadow"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-4 px-6 rounded-xl text-center shadow"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/users"
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-4 px-6 rounded-xl text-center shadow"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
