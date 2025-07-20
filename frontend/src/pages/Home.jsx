import React, { useEffect, useState } from 'react';
import { FaChair, FaBed, FaCouch, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import BACKEND_URL from '../config';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(res.data.slice(0, 8)); // Show only latest 8
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchLatestProducts();
  }, []);

  const categories = [
    { icon: <FaChair size={32} />, name: 'chairs' },
    { icon: <FaBed size={32} />, name: 'beds' },
    { icon: <FaCouch size={32} />, name: 'sofas' },
    { icon: <FaChair size={32} />, name: 'tables' },
  ];

  return (
    <div className="bg-[#e0e5ec] min-h-screen py-10 px-4 md:px-10">
      {/* 🚀 Hero Section with Animation */}
      <motion.section
        className="relative rounded-2xl text-white text-center mb-16 overflow-hidden p-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Discover Modern Living
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Premium Furniture for Comfort and Elegance
        </motion.p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to='/shop'
            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 rounded-full font-semibold shadow-md hover:bg-purple-100 transition-transform duration-300"
          >
            Shop Now <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          className="absolute top-2 left-4 text-white opacity-10 text-6xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <FaCouch />
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-8 text-white opacity-10 text-5xl"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          <FaBed />
        </motion.div>
      </motion.section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-[#e0e5ec] shadow-[5px_5px_10px_#c1c8d3,-5px_-5px_10px_#ffffff] cursor-pointer hover:scale-[1.03] transition-transform ${
                selectedCategory === cat.name ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="text-blue-400 mb-2">{cat.icon}</div>
              <p className="font-semibold text-gray-700">{cat.name}</p>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="text-center mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Show All Categories
            </button>
          </div>
        )}
      </section>

      {/* New Launches */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">New Launches</h2>
          <Link to="/products" className="text-blue-500 text-sm hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => !selectedCategory || product.category === selectedCategory)
            .map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <span className="absolute top-2 left-2 bg-[#d10029] text-white text-xs font-semibold px-2 py-1 rounded">
                  NEW
                </span>

                <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-grow">
                  <span className="text-xs text-green-700 font-semibold">{product.category}</span>
                  <h3 className="text-sm font-medium text-gray-800 mt-1">{product.name}</h3>
                  <div className="text-sm mt-1">
                    <span className="text-black font-semibold">₹{product.price}</span>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <Link
                    to={`/product/${product._id}`}
                    className="inline-block w-full text-center text-sm font-medium text-blue-600 border border-blue-600 rounded-md py-1 hover:bg-blue-600 hover:text-white transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

          {products.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
