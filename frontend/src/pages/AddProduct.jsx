import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({ title: "", price: "", image: "", description: "" });
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://dummyjson.com/products/add", form);
      alert("Product added!");
      navigate("/");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Product Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
