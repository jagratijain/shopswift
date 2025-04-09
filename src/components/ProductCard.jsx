import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ image, name, price, id, sizes }) => {
  const [selectedSize, setSelectedSize] = useState(sizes ? sizes[0] : "M");

  const handleAddToCart = () => {
    axios
      .post('http://localhost:5000/api/cart/add', {
        user_id: 1, // Replace with actual logged-in user ID in production
        product_id: id,
        product_title: name,
        product_image: image,
        product_price: price,
        selected_size: selectedSize,
        quantity: 1
      })
      .then(() => {
        toast.success("Item added to cart");
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      });
  };

  return (
    <div className="min-w-[200px] bg-white shadow rounded p-4">
      <img src={image} alt={name} className="h-40 w-full object-cover rounded" />
      <h3 className="font-bold mt-2">{name}</h3>
      <p className="text-gray-600">₹{price}</p>

      {sizes && (
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="mt-2 border rounded px-2 py-1 text-sm"
        >
          {sizes.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
