import React from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';


const Cart = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
// console.log("Cart items:", cartItems);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-[64px] right-0 h-[calc(100vh-64px)] w-full sm:w-[90%] md:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Cart{' '}
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 text-sm mt-8">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover border rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      className="p-1 border rounded text-sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="p-1 border rounded text-sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹{item.price}</p>
                  <button
                    className="text-red-500 mt-2 hover:text-red-700 text-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="px-4 py-4 border-t space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
        </div>

        {/* Checkout Button */}
        <div className="px-4 pb-6 pt-4 space-y-3">
          <a
            href="/checkout"
            className="w-full block bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium text-center"
          >
            Checkout
          </a>
        </div>
      </div>
    </>
  );
};

export default Cart;
