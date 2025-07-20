import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import BACKEND_URL from '../config';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { fetchCart } = useCart();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
       
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

       
        setUser({
          name: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
        });

        alert('Login successful!');

        
        if (data.user.role === 'admin') {
          navigate('/admin/products');
        } else {
          navigate('/');
        }

       
        await fetchCart();

      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred. Check console.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center">
      <div className="bg-[#e0e5ec] w-[375px] p-8 rounded-2xl shadow-[10px_10px_20px_#c1c8d3,-10px_-10px_20px_#ffffff]">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-xl text-gray-700 bg-[#e0e5ec] shadow-inner shadow-[inset_10px_10px_20px_#c1c8d3,inset_-10px_-10px_20px_#ffffff] focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-xl text-gray-700 bg-[#e0e5ec] shadow-inner shadow-[inset_10px_10px_20px_#c1c8d3,inset_-10px_-10px_20px_#ffffff] focus:outline-none"
          />

          <div className="text-right text-sm mb-6">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" className="w-full mb-4 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 font-medium shadow-[5px_5px_10px_#c1c8d3,-5px_-5px_10px_#ffffff] hover:bg-blue-100 transition duration-200">
            Sign In
          </button>
        </form>

        <button className="w-full mb-6 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 font-medium flex items-center justify-center gap-2 shadow-[5px_5px_10px_#c1c8d3,-5px_-5px_10px_#ffffff] hover:bg-red-100 transition duration-200">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
