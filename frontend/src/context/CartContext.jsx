import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import axios from '../axios'; 
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading: userLoading } = useUser();
  const initialLoaded = useRef(false);

  // Fetch cart from DB
  const fetchCart = async () => {
    if (!user?._id) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`/api/cart/${user._id}`);
      const items = res.data || [];

      const transformed = items.map(item => ({
        id: item.productId._id || item.productId,
        name: item.productId.name,
        image: item.productId.image,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      setCartItems(transformed);
      initialLoaded.current = true;
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Load cart on user load
  useEffect(() => {
    if (userLoading) return;
    fetchCart();
  }, [user, userLoading]);


  useEffect(() => {
    if (!user?._id || !initialLoaded.current) return;

    const syncCart = async () => {
      try {
        await axios.post(`/api/cart/save`, {
          userId: user._id,
          items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        });
      } catch (err) {
        console.error("Error syncing cart:", err);
      }
    };

    syncCart();
  }, [cartItems, user]);

  
  const addToCart = (item) => {
    const id = item._id || item.id;
    const quantityToAdd = item.quantity || 1;

    if (!id) {
      console.warn("Tried to add item with no ID:", item);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === id ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      } else {
        return [...prevItems, { ...item, id, quantity: quantityToAdd }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isCartOpen,
        setIsCartOpen,
        fetchCart,
        clearCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Export hook to access Cart context
export const useCart = () => useContext(CartContext);
