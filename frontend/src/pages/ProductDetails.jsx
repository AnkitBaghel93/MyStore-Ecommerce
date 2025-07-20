import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaPlus, FaMinus, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import BACKEND_URL from '../config';


const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Product ID from URL:', id);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        //  console.log('Fetched product:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    setIsCartOpen(true);
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <div className="p-10 text-center text-xl">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-[#e0e5ec] px-4 py-10 md:px-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-white rounded-2xl shadow-inner p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-xl"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>

          <div className="flex items-center gap-1 text-yellow-500 mb-3">
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            <span className="text-sm text-gray-500 ml-2">(120 reviews)</span>
          </div>

          <div className="text-2xl font-bold text-gray-700 mb-6">₹{product.price}</div>

          <div className="flex items-center gap-3 mb-6">
            <button onClick={decreaseQty} className="p-2 bg-[#e0e5ec] rounded-full shadow hover:scale-105 transition">
              <FaMinus />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button onClick={increaseQty} className="p-2 bg-[#e0e5ec] rounded-full shadow hover:scale-105 transition">
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-semibold bg-blue-400 text-white hover:bg-blue-500 transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <Link to='/checkout' className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600 transition">
              <FaBolt />
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
