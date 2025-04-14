// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from localStorage
    const fetchOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get payment method display name
  const getPaymentMethodName = (method) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "paypal":
        return "PayPal";
      case "upi":
        return "UPI";
      case "cod":
        return "Cash on Delivery";
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">{user?.email || "User"}</h2>
                  <p className="text-sm text-gray-500">Account Member</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-md ${activeTab === "orders" ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`w-full text-left px-4 py-2 rounded-md ${activeTab === "address" ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-md ${activeTab === "settings" ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Account Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Order History</h2>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-6 text-center">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                    <Link 
                      to="/" 
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <div key={index} className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId || `${index + 1000}`}</h3>
                              <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                                order.orderStatus === "Delivered" 
                                  ? "bg-green-100 text-green-800" 
                                  : order.orderStatus === "Cancelled" 
                                  ? "bg-red-100 text-red-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.orderStatus}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.orderDate)}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-lg font-bold text-gray-900">₹{order.orderTotal}</p>
                            <p className="text-sm text-gray-500">Payment: {getPaymentMethodName(order.paymentMethod)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-4">
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center">
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
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h4>{item.name}</h4>
                                  <p className="ml-4">₹{item.price} × {item.quantity}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Size: {item.size || "N/A"}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Shipping Address:</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {order.shippingAddress.addressLine1}
                              {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ""}
                              <br />
                              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </p>
                          </div>
                          
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                             <Link 
                            to={`/Trackorder/${order.orderId}`} 
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                             >
                              Track Order
                            </Link>
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "address" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
                </div>
                
                <div className="p-6">
                  {(() => {
                    const addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
                    const defaultAddress = addresses.find(addr => addr.isDefault) || 
                                          (addresses.length > 0 ? addresses[0] : null);
                    
                    if (addresses.length === 0) {
                      return (
                        <div className="text-center py-6">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                            />
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                          </svg>
                          <p className="text-gray-600 mb-6">You don't have any saved addresses.</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-6">
                        {defaultAddress && (
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-semibold text-gray-900">Default Address</h3>
                                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                    {defaultAddress.addressType.toUpperCase()}
                                  </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                  <p className="font-medium">{defaultAddress.fullName}</p>
                                  <p>{defaultAddress.addressLine1}</p>
                                  {defaultAddress.addressLine2 && <p>{defaultAddress.addressLine2}</p>}
                                  <p>{defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}</p>
                                  <p>Phone: {defaultAddress.phoneNumber}</p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Link 
                                  to={`/edit-address/${defaultAddress.id}`} 
                                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                >
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {addresses.filter(addr => !addr.isDefault).map(address => (
                          <div key={address.id} className="border rounded-md p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-semibold text-gray-900">Address</h3>
                                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    {address.addressType.toUpperCase()}
                                  </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                  <p className="font-medium">{address.fullName}</p>
                                  <p>{address.addressLine1}</p>
                                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                                  <p>{address.city}, {address.state} - {address.pincode}</p>
                                  <p>Phone: {address.phoneNumber}</p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    // Set as default address
                                    const updatedAddresses = addresses.map(addr => ({
                                      ...addr,
                                      isDefault: addr.id === address.id
                                    }));
                                    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
                                    localStorage.setItem("shippingAddress", JSON.stringify(address));
                                    // Force component refresh
                                    window.location.reload();
                                  }}
                                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                >
                                  Set as Default
                                </button>
                                <Link 
                                  to={`/edit-address/${address.id}`} 
                                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                >
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                  
                  <Link
                    to="/AddNewAddress"
                    className="mt-6 inline-block bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
                  >
                    Add New Address
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                </div>
                
                <div className="p-6">
                  <form>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Your email address cannot be changed</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Change Password
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <button
                          type="button"
                          className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition"
                        >
                          Delete Account
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;