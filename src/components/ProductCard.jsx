import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ id, image, name, price, category, sizes = ["S", "M", "L", "XL"] }) => {
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
          size: selectedSize,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`${name} (Size: ${selectedSize}) added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
