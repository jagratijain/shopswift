import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "../components/EditProduct";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Mock data for frontend-only demonstration
  const [products, setProducts] = useState([
    { id: 1, name: "Stylish Men Jacket", category: "men", price: 1999, inStock: true, image: "/api/placeholder/50/50" },
    { id: 2, name: "Trendy Women Dress", category: "women", price: 1499, inStock: true, image: "/api/placeholder/50/50" },
    { id: 3, name: "Elegant Watch", category: "accessories", price: 2999, inStock: true, image: "/api/placeholder/50/50" },
    { id: 4, name: "Gold Earrings", category: "accessories", price: 799, inStock: false, image: "/api/placeholder/50/50" },
    { id: 5, name: "Summer Kurti", category: "women", price: 1199, inStock: true, image: "/api/placeholder/50/50" },
  ]);
  
  const [orders, setOrders] = useState([
    { id: "ORD001", customerName: "Priya Sharma", customerEmail: "priya@example.com", date: "2025-04-10", totalAmount: 2798, status: "Delivered" },
    { id: "ORD002", customerName: "Rahul Verma", customerEmail: "rahul@example.com", date: "2025-04-12", totalAmount: 3499, status: "Processing" },
    { id: "ORD003", customerName: "Ananya Patel", customerEmail: "ananya@example.com", date: "2025-04-14", totalAmount: 1599, status: "Pending" },
    { id: "ORD004", customerName: "Arjun Singh", customerEmail: "arjun@example.com", date: "2025-04-15", totalAmount: 4298, status: "Shipped" },
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, displayName: "Priya Sharma", email: "priya@example.com", joinedAt: "2025-01-15", ordersCount: 3 },
    { id: 2, displayName: "Rahul Verma", email: "rahul@example.com", joinedAt: "2025-02-10", ordersCount: 2 },
    { id: 3, displayName: "Ananya Patel", email: "ananya@example.com", joinedAt: "2025-03-05", ordersCount: 1 },
    { id: 4, displayName: "Arjun Singh", email: "arjun@example.com", joinedAt: "2025-03-20", ordersCount: 1 },
  ]);

  // Check if user is admin on component mount and load data
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    }
    
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    if (savedProducts.length > 0) {
      setProducts(savedProducts);
    }
    
    // Load user data (in a real app, this would come from a database)
    // For now, we'll keep using the mock data
  }, [navigate]);

  // Handle viewing order details
  const handleViewOrderDetails = (orderId) => {
    setViewingOrder(orderId);
    
    // Find the full order details from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const fullOrderDetails = allOrders.find(order => order.orderId === orderId);
    
    if (fullOrderDetails) {
      setOrderDetails(fullOrderDetails);
    } else {
      // If not found in localStorage, show limited details from admin orders
      const adminOrder = orders.find(order => order.id === orderId);
      setOrderDetails({
        orderId: adminOrder.id,
        customerName: adminOrder.customerName,
        customerEmail: adminOrder.customerEmail,
        date: adminOrder.date,
        orderTotal: adminOrder.totalAmount,
        orderStatus: adminOrder.status,
        items: [],
        shippingAddress: { fullName: adminOrder.customerName }
      });
    }
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // Update in admin orders
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("adminOrders", JSON.stringify(updatedOrders));
    
    // Update in full orders if available
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedAllOrders = allOrders.map(order => 
      order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedAllOrders));
    
    // Update current order details if viewing
    if (viewingOrder === orderId && orderDetails) {
      setOrderDetails({ ...orderDetails, orderStatus: newStatus });
    }
  };

  // Function to handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Function to handle saving an edited product
  const handleSaveProduct = (updatedProduct) => {
    let newProducts;
    
    if (updatedProduct.id) {
      // Editing existing product
      newProducts = products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      );
    } else {
      // Adding new product
      const newProduct = {
        ...updatedProduct,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      newProducts = [...products, newProduct];
    }
    
    setProducts(newProducts);
    setEditingProduct(null);
    setIsAddingProduct(false);
    
    // Save to localStorage for persistence
    localStorage.setItem("adminProducts", JSON.stringify(newProducts));
  };

  // Function to handle adding a new product
  const handleAddProduct = () => {
    setIsAddingProduct(true);
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      
      // Save to localStorage for persistence
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Format category name to display properly
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        
        <nav>
          <button 
            className={`w-full text-left py-3 px-4 rounded mb-2 ${activeTab === 'products' ? 'bg-purple-900' : 'hover:bg-purple-700'}`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products
          </button>
          
          <button 
            className={`w-full text-left py-3 px-4 rounded mb-2 ${activeTab === 'orders' ? 'bg-purple-900' : 'hover:bg-purple-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          
          <button 
            className={`w-full text-left py-3 px-4 rounded mb-2 ${activeTab === 'users' ? 'bg-purple-900' : 'hover:bg-purple-700'}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="w-full mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-8"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <button 
                onClick={handleAddProduct}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add New Product
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={product.image} 
                              alt={product.name} 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E";
                              }} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCategory(product.category)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{order.totalAmount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleViewOrderDetails(order.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.displayName || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(user.joinedAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.ordersCount || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Edit Product Modal */}
        {editingProduct && (
          <EditProduct 
            product={editingProduct} 
            onSave={handleSaveProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}
        
        {/* Add Product Modal */}
        {isAddingProduct && (
          <EditProduct 
            product={null} 
            onSave={handleSaveProduct}
            onCancel={() => setIsAddingProduct(false)}
          />
        )}
        
        {/* Order Details Modal */}
        {viewingOrder && orderDetails && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Order Details: #{orderDetails.orderId}</h2>
                <button 
                  onClick={() => {
                    setViewingOrder(null);
                    setOrderDetails(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                  <p className="text-gray-700">{orderDetails.customerName || 'N/A'}</p>
                  <p className="text-gray-700">{orderDetails.customerEmail || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                  <p className="text-gray-700">Order Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
                  <p className="text-gray-700">Order Total: ₹{orderDetails.orderTotal}</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      value={orderDetails.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(orderDetails.orderId, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {orderDetails.shippingAddress && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{orderDetails.shippingAddress.fullName}</p>
                  {orderDetails.shippingAddress.addressLine1 && (
                    <>
                      <p className="text-gray-700">{orderDetails.shippingAddress.addressLine1}</p>
                      {orderDetails.shippingAddress.addressLine2 && (
                        <p className="text-gray-700">{orderDetails.shippingAddress.addressLine2}</p>
                      )}
                      <p className="text-gray-700">
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                      </p>
                      <p className="text-gray-700">Phone: {orderDetails.shippingAddress.phoneNumber}</p>
                    </>
                  )}
                </div>
              )}
              
              {orderDetails.items && orderDetails.items.length > 0 ? (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orderDetails.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={item.image} 
                                    alt={item.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E";
                                    }}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                  <p className="text-gray-500">No item details available for this order.</p>
                </div>
              )}
              
              <div className="flex justify-between border-t pt-6">
                <button
                  onClick={() => {
                    setViewingOrder(null);
                    setOrderDetails(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Close
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateOrderStatus(orderDetails.orderId, 'Cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                  
                  {orderDetails.orderStatus === 'Pending' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(orderDetails.orderId, 'Processing')}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Mark as Processing
                    </button>
                  )}
                  
                  {orderDetails.orderStatus === 'Processing' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(orderDetails.orderId, 'Shipped')}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Mark as Shipped
                    </button>
                  )}
                  
                  {orderDetails.orderStatus === 'Shipped' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(orderDetails.orderId, 'Delivered')}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;