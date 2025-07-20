import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WishList from './pages/WishList';
import CartItem from './components/CartItem';
import ManageProducts from './pages/Dashboarrd/ManageProducts';
import Shop from './pages/Shop';
import ManageOrders from './pages/Dashboarrd/ManageOrders';
import AdminDashboard from './pages/Dashboarrd/AdminDashboard';

function App() {
   const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <main className="min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/cartitem" element={<CartItem />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shop" element={<Shop />} />

              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/orders" element={<ManageOrders />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
