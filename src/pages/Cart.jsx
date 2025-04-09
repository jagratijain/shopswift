import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart/1"); // Replace with dynamic user_id
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.product_image} alt={item.product_title} className="w-24 h-24 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.product_title}</h3>
                  <p>Price: ₹{item.product_price}</p>
                  <p>Size: {item.selected_size}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
