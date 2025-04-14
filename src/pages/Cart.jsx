// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    setLoading(false);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/shopnow" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Cart Items ({cartItems.length})</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <li key={`${item.id}-${item.size}-${index}`} className="px-6 py-4 flex items-center">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover object-center" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=Product';
                          }}
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <p className="text-base font-medium text-gray-900">₹{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.size || 'Not specified'}</p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded-md">
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="text-sm text-red-600 hover:text-red-800"
                            onClick={() => handleRemoveItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="px-6 py-4 border-t">
                  <button
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-900 font-medium">₹{calculateSubtotal()}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-gray-900 font-medium">
                      {calculateSubtotal() > 999 ? 'Free' : '₹99'}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax (18%)</p>
                    <p className="text-gray-900 font-medium">₹{Math.round(calculateSubtotal() * 0.18)}</p>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{calculateSubtotal() + 
                        (calculateSubtotal() > 999 ? 0 : 99) + 
                        Math.round(calculateSubtotal() * 0.18)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => navigate("/address")}
                    className="w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 transition mt-6"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-6">
                    <Link 
                      to="/shopnow" 
                      className="text-sm text-purple-600 hover:text-purple-800 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Free standard shipping on all orders over ₹999. Estimated delivery time is 3-5 business days.
                </p>
                <p className="text-gray-600 text-sm">
                  For any queries regarding your order, please contact our customer service.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="border rounded p-2 w-16 h-10 flex items-center justify-center bg-gray-50">
                    <span className="font-medium text-sm">Visa</span>
                  </div>
                  <div className="border rounded p-2 w-16 h-10 flex items-center justify-center bg-gray-50">
                    <span className="font-medium text-sm">MC</span>
                  </div>
                  <div className="border rounded p-2 w-16 h-10 flex items-center justify-center bg-gray-50">
                    <span className="font-medium text-sm">PayPal</span>
                  </div>
                  <div className="border rounded p-2 w-16 h-10 flex items-center justify-center bg-gray-50">
                    <span className="font-medium text-sm">UPI</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  All transactions are secure and encrypted.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;