import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    category: '',
    description: '',
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/products`, formData);
      if (res.status === 201) {
        alert('Product added!');
        fetchProducts();
        setFormData({
          name: '',
          price: '',
          stock: '',
          image: '',
          category: '',
          description: '',
        });
        setShowForm(false);
      }
    } catch (err) {
      console.error('Add product failed', err);
      alert('Failed to add product.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="mb-6 p-4 bg-white rounded shadow border space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Category</option>
              <option value="chairs">Chairs</option>
              <option value="beds">Beds</option>
              <option value="sofas">Sofas</option>
              <option value="tables">Tables</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Product
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border px-2 sm:px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border px-2 sm:px-4 py-2">{product.name}</td>
                <td className="border px-2 sm:px-4 py-2">₹{product.price}</td>
                <td className="border px-2 sm:px-4 py-2">{product.stock}</td>
                <td className="border px-2 sm:px-4 py-2 capitalize">{product.category}</td>
                <td className="border px-2 sm:px-4 py-2 capitalize">{product.description}</td>
                <td className="border px-2 sm:px-4 py-2">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded w-full sm:w-auto">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded w-full sm:w-auto"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
