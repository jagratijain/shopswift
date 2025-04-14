// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Invoice Generator Component
const InvoicePDFGenerator = ({ order, index }) => {
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
        <title>ShopSwift Invoice - ${order.orderId || `${index + 1000}`}</title>
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
          <p><strong>Order ID:</strong> ${order.orderId || `${index + 1000}`}</p>
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

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

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

  // Handle Buy Again functionality
  const handleBuyAgain = (order) => {
    // Get current cart items from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add all items from the selected order to cart
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
    setToastMessage("Items added to your cart");
    setShowSuccessToast(true);
    
    // Hide the toast after 1.5 seconds and navigate
    setTimeout(() => {
      setShowSuccessToast(false);
      // Navigate to cart page
      navigate("/cart");
    }, 1500);
  };

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
              <p className="text-sm">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <Link to="/Home" className="text-purple-600 hover:text-purple-800 font-medium">
            Continue Shopping
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : orders.length === 0 ? (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link 
              to="/Home" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between">
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
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <p className="text-lg font-bold text-gray-900 mr-4">₹{order.orderTotal}</p>
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
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-gray-500">Size: {item.size || "N/A"}</p>
                            <p className="text-sm text-gray-500">Total: ₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address:</h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.addressLine1}</p>
                        {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <p>Phone: {order.shippingAddress.phoneNumber}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information:</h4>
                      <div className="text-sm text-gray-600">
                        <p>Method: {getPaymentMethodName(order.paymentMethod)}</p>
                        <p>Status: {order.paymentStatus}</p>
                        <div className="mt-3">
                          <p className="font-medium">Order Summary:</p>
                          <div className="flex justify-between mt-1">
                            <span>Subtotal</span>
                            <span>₹{order.orderTotal - (order.orderTotal * 0.18)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (18%)</span>
                            <span>₹{Math.round(order.orderTotal * 0.18)}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                            <span>Total</span>
                            <span>₹{order.orderTotal}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex justify-between">
                    <button className="text-gray-600 hover:text-gray-800 text-sm">
                      Need Help?
                    </button>
                    <div className="space-x-4">
                      {/* Replace Download Invoice button with component */}
                      <InvoicePDFGenerator order={order} index={index} />
                      {/* Add onClick handler to Buy Again button */}
                      <button 
                        onClick={() => handleBuyAgain(order)}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;