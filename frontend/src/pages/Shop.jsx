import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import BACKEND_URL from '../config';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const location = useLocation();
  const categoryQuery = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (categoryQuery) {
      const filteredProducts = products.filter((p) =>
        p.category.toLowerCase().includes(categoryQuery.toLowerCase())
      );
      setFiltered(filteredProducts);
    } else {
      setFiltered(products);
    }
  }, [categoryQuery, products]);

  return (
    <div className="bg-[#f1f3f5] min-h-screen px-4 py-10 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {categoryQuery ? `Results for "${categoryQuery}"` : 'Shop All Products'}
      </h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex-grow">
                <p className="text-xs text-green-700 font-semibold">{product.category}</p>
                <h3 className="text-sm font-medium text-gray-800 mt-1">{product.name}</h3>
                <p className="text-sm text-black font-semibold mt-1">₹{product.price}</p>
              </div>

              <div className="px-4 pb-4">
                <Link
                  to={`/product/${product._id}`}
                  className="block w-full text-center text-sm font-medium text-blue-600 border border-blue-600 rounded-md py-1 hover:bg-blue-600 hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
