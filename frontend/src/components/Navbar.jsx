import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Cart from '../pages/Cart';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { cartItems, isCartOpen, setIsCartOpen } = useCart();
  const { user, setUser } = useUser();
  const isAdmin = user?.role === 'admin';

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = isAdmin
    ? [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Products', path: '/admin/products' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
      ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?category=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <nav className="bg-[#1e1e1e] text-white px-4 py-3 shadow-md z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Left - Logo */}
          <div className="flex items-center gap-4">
            <NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
              <FaShoppingCart className="text-blue-400" />
              MyStore
            </NavLink>

            {/* Desktop NavLinks */}
            <div className="hidden md:flex items-center gap-4 ml-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive ? 'text-blue-400 underline' : 'hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Center - Search */}
          <form
            onSubmit={handleSearch}
            className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md hidden md:block"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-[#aeacac] text-white placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-500 transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            {!isAdmin && (
              <>
                <NavLink to="/wishlist" className="relative text-pink-400 hover:text-white">
                  <FaHeart size={20} />
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                    2
                  </span>
                </NavLink>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-blue-400 hover:text-white"
                >
                  <FaShoppingCart size={22} />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                      {totalCartCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Desktop Dropdown/Login */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="bg-[#e0e5ec] text-gray-800 px-4 py-1.5 rounded-xl font-medium shadow-md"
                  >
                    {user.fullName || user.name}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-50">
                      {!isAdmin && (
                        <NavLink
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Orders
                        </NavLink>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="bg-[#e0e5ec] text-gray-800 px-4 py-1.5 rounded-xl font-medium shadow-md hover:scale-105 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-[#e0e5ec] text-gray-800 px-4 py-1.5 rounded-xl font-medium shadow-md hover:scale-105 transition"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-[#aeacac] text-white placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e1e1e] px-6 py-4 flex flex-col space-y-4 z-40">
          <div className="flex flex-col items-center space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-center font-medium transition ${isActive ? 'text-blue-400 underline' : 'hover:text-white'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {user ? (
            <>
              {!isAdmin && (
                <NavLink
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="bg-white text-black px-4 py-2 rounded-xl font-medium shadow hover:scale-105 transition"
                >
                  Orders
                </NavLink>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-white text-black px-4 py-2 rounded-xl font-medium shadow hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-black px-4 py-2 rounded-xl font-medium shadow hover:scale-105 transition flex justify-center"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-black px-4 py-2 rounded-xl font-medium shadow hover:scale-105 transition flex justify-center"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
