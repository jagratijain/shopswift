// src/pages/TrackOrder.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Invoice Generator Component
const InvoicePDFGenerator = ({ order }) => {
  const generateInvoice = () => {
    // Create a new window for the printable invoice
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Calculate subtotal (total - tax)
    const subtotal = (order.orderTotal - Math.round(order.orderTotal * 0.18)).toFixed(2);
    const tax = Math.round(order.orderTotal * 0.18).toFixed(2);
    
    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    // Calculate estimated delivery date (5 days from order date)
    const getEstimatedDeliveryDate = (orderDate) => {
      const date = new Date(orderDate);
      date.setDate(date.getDate() + 5);
      return formatDate(date);
    };
    
    // Generate the HTML content for the invoice
    const invoiceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ShopSwift Invoice - ${order.orderId || "ORD-538700"}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          .header {
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .company-name {
            color: #800080;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .invoice-title {
            color: #666;
            margin-top: 5px;
          }
          .order-details, .address-section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .address-block {
            line-height: 1.5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #800080;
            color: white;
            text-align: left;
            padding: 10px;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .summary-table {
            width: 300px;
            margin-left: auto;
          }
          .summary-table td {
            padding: 5px 10px;
          }
          .summary-table .total-row {
            font-weight: bold;
            font-size: 16px;
            border-top: 2px solid #333;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
          .print-button {
            background-color: #800080;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          @media print {
            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Print Invoice</button>
        
        <div class="header">
          <h1 class="company-name">ShopSwift</h1>
          <p class="invoice-title">Invoice</p>
        </div>
        
        <div class="order-details">
          <div class="section-title">Order Information</div>
          <p><strong>Order ID:</strong> ${order.orderId || "ORD-538700"}</p>
          <p><strong>Order Date:</strong> ${formatDate(order.orderDate)}</p>
          <p><strong>Estimated Delivery:</strong> ${getEstimatedDeliveryDate(order.orderDate)}</p>
        </div>
        
        <div class="address-section">
          <div class="section-title">Delivery Address</div>
          <div class="address-block">
            ${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.addressLine1}<br>
            ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
            Phone: ${order.shippingAddress.phoneNumber}
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.size || "N/A"}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <table class="summary-table">
          <tr>
            <td>Subtotal:</td>
            <td>₹${subtotal}</td>
          </tr>
          <tr>
            <td>Tax (18%):</td>
            <td>₹${tax}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td>Free</td>
          </tr>
          <tr class="total-row">
            <td>Total:</td>
            <td>₹${order.orderTotal}</td>
          </tr>
        </table>
        
        <div class="footer">
          <p>Thank you for shopping with ShopSwift!</p>
          <p>For any queries, please contact us at support@jagratijain.com</p>
        </div>
      </body>
      </html>
    `;
    
    // Write the content to the new window
    printWindow.document.open();
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
  };

  return (
    <button 
      className="text-purple-600 hover:text-purple-800 text-sm font-medium"
      onClick={generateInvoice}
    >
      Download Invoice
    </button>
  );
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Fetch order details from localStorage
    const fetchOrder = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        
        // First try to find by orderId directly
        let foundOrder = savedOrders.find(o => o.orderId === orderId);
        
        // If not found, try numeric comparison (in case orderId is a number)
        if (!foundOrder && !isNaN(orderId)) {
          foundOrder = savedOrders.find(o => o.orderId === parseInt(orderId));
        }
        
        // If still not found, try to match the fallback orderId format (ORD-XXXXX)
        if (!foundOrder && orderId && orderId.startsWith("ORD-")) {
          foundOrder = savedOrders.find(o => o.orderId && o.orderId.toString() === orderId);
        }
        
        // If still not found, try by index
        if (!foundOrder) {
          const index = parseInt(orderId) - 1000;
          if (!isNaN(index) && index >= 0 && index < savedOrders.length) {
            foundOrder = savedOrders[index];
          }
        }
        
        if (foundOrder) {
          setOrder(foundOrder);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Handle Buy Again functionality
  const handleBuyAgain = () => {
    // Get current cart items from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add all items from the current order to cart
    order.items.forEach(item => {
      // Check if the item already exists in cart
      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        currentCart[existingItemIndex].quantity += item.quantity;
      } else {
        // Otherwise add new item to cart
        currentCart.push({
          ...item,
          id: item.id || `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          addedAt: new Date().toISOString()
        });
      }
    });
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Show success message
    setShowSuccessToast(true);
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
      // Navigate to cart page
      navigate("/cart");
    }, 1500);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate estimated delivery date (5 days from order date)
  const getEstimatedDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return formatDate(date);
  };

  // Get current order stage (1: Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered)
  const getOrderStage = (status) => {
    switch (status) {
      case "Confirmed":
        return 1;
      case "Shipped":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      case "Cancelled":
        return -1;
      default:
        return 1; // Default to Confirmed
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
            <Link 
              to="/Orderhistory" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Go to Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderStage = getOrderStage(order.orderStatus || "Confirmed");
  const estimatedDelivery = getEstimatedDeliveryDate(order.orderDate);
  
  // Ensure order.orderStatus exists, defaulting to 'Confirmed' if not
  const orderStatus = order.orderStatus || "Confirmed";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Items added to your cart</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            to="/Orderhistory" 
            className="text-purple-600 hover:text-purple-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Orders
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Track Order <span className="text-gray-600">#{order.orderId || "ORD-538700"}</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.orderDate)}</p>
              </div>
              
              <div className="mt-2 md:mt-0">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  orderStatus === "Delivered" 
                    ? "bg-green-100 text-green-800" 
                    : orderStatus === "Cancelled" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {orderStatus}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Order Progress Timeline */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Order Placed</span>
                <span className="text-sm font-medium text-gray-900">Shipped</span>
                <span className="text-sm font-medium text-gray-900">Out for Delivery</span>
                <span className="text-sm font-medium text-gray-900">Delivered</span>
              </div>
              
              <div className="relative">
                {/* Progress Bar Background */}
                <div className="h-2 bg-gray-200 rounded-full"></div>
                
                {/* Active Progress Bar */}
                <div 
                  className={`absolute top-0 left-0 h-2 ${
                    orderStage === -1 ? 'bg-red-500' : 'bg-purple-600'
                  } rounded-full`}
                  style={{ width: `${orderStage === -1 ? 100 : Math.max(5, (orderStage * 33.33))}%` }}
                ></div>
                
                {/* Progress Circles */}
                <div className="absolute top-0 left-0 transform -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-purple-600"></div>
                
                <div className={`absolute top-0 left-1/3 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white ${
                  orderStage >= 2 ? 'bg-purple-600' : 'bg-gray-200'
                }`}></div>
                
                <div className={`absolute top-0 left-2/3 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white ${
                  orderStage >= 3 ? 'bg-purple-600' : 'bg-gray-200'
                }`}></div>
                
                <div className={`absolute top-0 right-0 transform -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white ${
                  orderStage >= 4 ? 'bg-purple-600' : 'bg-gray-200'
                }`}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Delivery Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Estimated Delivery:</span> {estimatedDelivery}
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Address:</h3>
                    <div className="text-sm text-gray-600">
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                      <p>Phone: {order.shippingAddress.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Order Updates:</h3>
                    <ul className="space-y-3">
                      <li className="text-sm flex items-start">
                        <span className="h-5 w-5 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>
                          <span className="font-medium">{formatDate(order.orderDate)}</span> - Order confirmed
                        </span>
                      </li>
                      
                      {/* Sample updates - in a real app, these would be dynamic */}
                      <li className="text-sm flex items-start text-gray-500">
                        <span className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </span>
                        <span>Package is being prepared for shipping</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Order Items */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <li key={index} className={`py-3 ${index === 0 ? 'pt-0' : ''}`}>
                        <div className="flex items-center">
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
                            <div className="flex justify-between text-sm font-medium">
                              <h3 className="text-gray-900">{item.name}</h3>
                              <p className="text-gray-900">₹{item.price} × {item.quantity}</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Size: {item.size || "N/A"}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">₹{(order.orderTotal - Math.round(order.orderTotal * 0.18)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Tax (18%)</span>
                      <span className="text-gray-900 font-medium">₹{Math.round(order.orderTotal * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-base font-medium mt-3 pt-3 border-t border-gray-200">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">₹{order.orderTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
            <button 
              onClick={() => navigate("/Orderhistory")}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Need Help?
            </button>
            <div className="space-x-4">
              {/* Replaced button with InvoicePDFGenerator component */}
              <InvoicePDFGenerator order={order} />
              <button 
                onClick={handleBuyAgain}
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition"
              >
                Buy Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;