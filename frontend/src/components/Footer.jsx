import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">MyStore</h2>
          <p className="text-sm text-gray-400">
            Your one-stop destination for premium products at the best prices.
            Discover more. Shop smarter.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
            <li><Link to="/support" className="hover:text-white">Support</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ShopKart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
