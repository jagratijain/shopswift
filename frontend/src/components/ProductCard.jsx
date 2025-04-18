import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ 
  id, 
  image, 
  name, 
  price, 
  category, 
  rating = 4.5, 
  reviewCount = 0,
  sizes = ["S", "M", "L", "XL"] 
}) => {
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some(item => item.id === id);
  });

  const [selectedSize, setSelectedSize] = useState(sizes[0]); // Default to first size
  const [showSizes, setShowSizes] = useState(false);

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      if (!isInWishlist) {
        const newItem = {
          id,
          name,
          price,
          image,
          category,
          rating,
          reviewCount,
          size: selectedSize,
          addedAt: new Date().toISOString()
        };

        wishlist.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsInWishlist(true);
      } else {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      }

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      setShowSizes(true);
      alert("Please select a size");
      return;
    }

    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(
        item => item.id === id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          image,
          category,
          rating,
          reviewCount,
          size: selectedSize,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      
      // Using a nicer notification instead of alert
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in-up';
      notification.innerHTML = `<div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${name} (Size: ${selectedSize}) added to cart!
      </div>`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('animate-fade-out');
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Function to render star rating
  const renderStars = () => {
    return (
      <div className="flex items-center mt-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
            size={12} 
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">
          {rating} {reviewCount > 0 && `(${reviewCount})`}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative">
        <Link to={`/product/${id}`} className="block overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x400?text=Product+Image";
            }}
          />
          {category && (
            <div className="absolute top-2 left-2">
              <span className="bg-purple-600 text-white px-2 py-1 text-xs rounded-full">
                {category}
              </span>
            </div>
          )}
        </Link>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:text-red-500"
            } shadow-md transition-all duration-200`}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FaHeart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-700 transition">
            {name}
          </h3>
        </Link>
        
        {renderStars()}
        
        <p className="text-lg font-bold text-gray-900 mt-1 mb-3">₹{price}</p>

        {showSizes && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border ${
                    selectedSize === size
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowSizes(true)}
          className="w-full bg-purple-600 text-white py-2 rounded mb-2 hover:bg-purple-700 transition"
        >
          {showSizes ? "Change Size" : "Select Size"}
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <FaShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;