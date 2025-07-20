import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#e0e5ec] w-[375px] p-8 rounded-2xl shadow-[10px_10px_20px_#c1c8d3,-10px_-10px_20px_#ffffff]"
      >
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">Register</h2>

        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner shadow-[inset_10px_10px_20px_#c1c8d3,inset_-10px_-10px_20px_#ffffff] focus:outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner shadow-[inset_10px_10px_20px_#c1c8d3,inset_-10px_-10px_20px_#ffffff] focus:outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner shadow-[inset_10px_10px_20px_#c1c8d3,inset_-10px_-10px_20px_#ffffff] focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-[#e0e5ec] text-gray-700 font-medium shadow-[5px_5px_10px_#c1c8d3,-5px_-5px_10px_#ffffff] hover:bg-green-100 transition duration-200"
        >
          Register
        </button>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
