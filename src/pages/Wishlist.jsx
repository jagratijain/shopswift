import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from localStorage
    const loadWishlist = () => {
      try {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(savedWishlist);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
    // Listen for wishlist updates
    window.addEventListener("wishlistUpdated", loadWishlist);
    
    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
    };
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
      
      // Dispatch event to update wishlist count in navbar
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Add item to cart
  const addToCart = (product) => {
    try {
      // Get current cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if product is already in cart
      const existingItemIndex = cart.findIndex(
        item => item.id === product.id && item.size === (product.size || "M")
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }
      
      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Dispatch event to update cart count in navbar
      window.dispatchEvent(new Event("cartUpdated"));
      
      // Show success message
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <Link to="/Home" className="text-purple-600 hover:text-purple-800 font-medium">
            Continue Shopping
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-purple-400 mx-auto mb-4">
              <FaHeart className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Items added to your wishlist will be saved here</p>
            <Link 
              to="/Home" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wishlistItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img 
                              className="h-16 w-16 object-cover rounded" 
                              src={item.image} 
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150?text=Product";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-purple-700"
                            >
                              {item.name}
                            </Link>
                            {item.size && (
                              <p className="text-xs text-gray-500">Size: {item.size}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{item.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          In Stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => addToCart(item)}
                          className="text-white bg-purple-600 hover:bg-purple-700 p-2 rounded-full mx-1"
                          title="Add to Cart"
                        >
                          <FaShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full mx-1"
                          title="Remove from Wishlist"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    // Add all wishlist items to cart
                    wishlistItems.forEach(item => addToCart(item));
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <FaShoppingCart />
                  Add All to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;