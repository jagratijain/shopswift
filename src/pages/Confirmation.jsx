// src/pages/Confirmation.jsx - Add this or update existing file

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Confirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get the pending order from localStorage
    const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    
    if (pendingOrder) {
      // Set the order details
      setOrderDetails(pendingOrder);
      
      // Complete the order process
      finalizeOrder(pendingOrder);
    }
  }, []);

  const finalizeOrder = (order) => {
    // Get existing orders array or create a new one
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Update order status to Processing (since payment is complete)
    const completedOrder = {
      ...order,
      orderStatus: "Processing"
    };
    
    // Add to orders history
    existingOrders.push(completedOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    // Update admin orders with new status
    const adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    const updatedAdminOrders = adminOrders.map(adminOrder => 
      adminOrder.id === order.orderId 
        ? { ...adminOrder, status: "Processing" } 
        : adminOrder
    );
    localStorage.setItem("adminOrders", JSON.stringify(updatedAdminOrders));
    
    // Clear cart and pending order
    localStorage.removeItem("cart");
    localStorage.removeItem("pendingOrder");
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // If no order details, show a message
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Order Information Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find any order details. This could be because you refreshed the page after order completion.</p>
          <Link 
            to="/home" 
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="font-medium text-gray-900">
                Order #{orderDetails.orderId}
              </h2>
              <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                Placed on {new Date(orderDetails.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <h3 className="font-medium text-gray-900 mb-4">Items</h3>
            
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="sans-serif" fill="%23999999"%3EProduct Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.size && `Size: ${item.size}`}
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">₹{orderDetails.subtotal}</p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">
                  {orderDetails.shipping === 0 ? 'Free' : `₹${orderDetails.shipping}`}
                </p>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <p className="text-gray-600">Tax</p>
                <p className="font-medium">₹{orderDetails.tax}</p>
              </div>
              <div className="flex justify-between text-base font-medium">
                <p className="text-gray-900">Total</p>
                <p className="text-gray-900">₹{orderDetails.orderTotal}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Shipping Information</h3>
          </div>
          
          <div className="px-6 py-4">
            <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>
            <p>{orderDetails.shippingAddress.addressLine1}</p>
            {orderDetails.shippingAddress.addressLine2 && (
              <p>{orderDetails.shippingAddress.addressLine2}</p>
            )}
            <p>
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
            </p>
            <p className="mt-2">Phone: {orderDetails.shippingAddress.phoneNumber}</p>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We'll send you shipping confirmation when your order is on the way! 
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/home" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Continue Shopping
            </Link>
            
            <Link 
              to="/profile" 
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;