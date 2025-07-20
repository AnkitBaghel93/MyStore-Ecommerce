import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import BACKEND_URL from '../config';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const { width, height } = useWindowSize();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    notes: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = async () => {
    if (!user?._id) {
      setMessage("User not logged in. Please login to continue.");
      setError(true);
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      setError(true);
      return;
    }

    const preparedItems = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const orderPayload = {
      userId: user._id,
      items: preparedItems,
      shippingInfo: formData,
      totalAmount: total,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/orders/place`, orderPayload);

      setMessage(res.data.message || "Order placed successfully!");
      setError(false);
      clearCart();
      setShowConfetti(true);

      // Hide confetti after 5 seconds
       setTimeout(() => {
       setShowConfetti(false);
       navigate('/');
  }, 3000);
    } catch (err) {
      console.error("Order failed:", err.response?.data || err.message);
      setMessage(err?.response?.data?.message || 'Failed to place order.');
      setError(true);
    }
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Shipping Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(formData).map(([key, value]) =>
                key !== 'notes' ? (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    value={value}
                    placeholder={key.replace(/([A-Z])/g, ' $1')}
                    onChange={handleChange}
                    className={`input ${key.includes('Line') ? 'md:col-span-2' : ''}`}
                  />
                ) : null
              )}
              <textarea
                name="notes"
                rows="3"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
                className="input md:col-span-2"
              />
            </form>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-10 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                      <div>
                        <p className="font-medium text-gray-700">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {message && (
              <div
                className={`mt-4 p-3 rounded-md text-sm ${
                  error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleOrder}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition"
              disabled={cartItems.length === 0}
            >
              Ordered (COD)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
