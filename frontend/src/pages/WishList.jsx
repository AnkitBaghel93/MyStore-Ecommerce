import React from 'react';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; 

const wishlistItems = [
  {
    id: 1,
    name: 'Ergonomic Office Chair',
    price: 4999,
    image:
      'https://www.nilkamalfurniture.com/cdn/shop/products/1_e3ff0e6d-6eec-4d3f-baa2-2fa15d986fac_1024x.jpg?v=1663151846',
  },
  {
    id: 2,
    name: 'Modern Study Table',
    price: 7999,
    image:
      'https://www.nilkamalfurniture.com/cdn/shop/products/mainimage_d3f62449-1242-41e7-81b3-2ad7a432b013_1024x.jpg?v=1624520047',
  },
];

const WishList = () => {
const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide">My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">Your wishlist is empty.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
<div
  key={item.id}
  className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col justify-between"
>
  <img
    src={item.image}
    alt={item.name}
    className="w-full h-52 object-cover rounded-t-2xl"
  />

  <div className="p-4 flex flex-col flex-grow justify-between h-full">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
      <p className="text-blue-600 font-bold mt-1 text-lg">₹{item.price}</p>
    </div>

    <div className="flex items-center justify-between mt-4">
      <button
        className="text-red-500 hover:text-red-600 transition"
        title="Remove from Wishlist"
      >
        <FaTrashAlt size={18} />
      </button>

      <button
        onClick={() => handleAddToCart(item)}
        className="inline-flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
      >
        <FaShoppingCart size={14} />
        Add to Cart
      </button>
    </div>
  </div>
</div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
