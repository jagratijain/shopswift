// src/pages/Checkout/Confirmation.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Confirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    if (orders.length === 0) {
      // Redirect to home if no orders
      navigate("/");
      return;
    }
    
    // Get the latest order
    const latestOrder = orders[orders.length - 1];
    setOrder(latestOrder);
    
    // Dispatch event to update cart count in navbar (should be 0 now)
    window.dispatchEvent(new Event('cartUpdated'));
  }, [navigate]);

  if (!order) {
    return null; // Prevents rendering until redirect happens or order loads
  }

  // Generate a random order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">✓</div>
              <span className="ml-2 font-medium text-gray-700">Address</span>
            </div>
            <div className="w-8 h-1 mx-2 bg-green-600"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">✓</div>
              <span className="ml-2 font-medium text-gray-700">Payment</span>
            </div>
            <div className="w-8 h-1 mx-2 bg-purple-600"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">3</div>
              <span className="ml-2 font-medium text-purple-700">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden text-center p-8">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="border p-6 rounded-lg mb-8 mx-auto max-w-lg text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h3 className="text-lg font-semibold">Order Information</h3>
              <span className="text-purple-600 font-medium">{orderId}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-gray-600">Order Date:</p>
                <p className="font-medium">{formatDate(order.orderDate)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Payment Method:</p>
                <p className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping Address:</p>
                <p className="font-medium text-right">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.addressLine1}<br />
                  {order.shippingAddress.addressLine2 ? `${order.shippingAddress.addressLine2}<br />` : ''}
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>
              <div className="flex justify-between pb-3 pt-3 border-t border-b">
                <p className="text-gray-600">Total Amount:</p>
                <p className="font-bold text-lg">₹{order.orderTotal}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 mx-auto max-w-lg">
            <h3 className="text-lg font-semibold mb-4 text-left">Order Items</h3>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center border-b pb-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                  <div className="ml-4 flex flex-1 flex-col text-left">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h4>{item.name}</h4>
                      <p className="ml-4">₹{item.price}</p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600 mb-6">
              We've sent a confirmation email to your registered email address with all the order details.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/Orderhistory" 
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                View My Orders
              </Link>
              <Link 
                to="/Home" 
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;