import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    updateCartCount();
    updateWishlistCount();

    window.addEventListener("storage", () => {
      updateCartCount();
      updateWishlistCount();
    });

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Searchresult?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex justify-between items-center px-6 py-3">
      <div
        className="text-2xl font-bold text-purple-700 cursor-pointer"
        onClick={navigateToHome}
      >
        ShopSwift
      </div>

      <div className="space-x-6 text-lg hidden md:flex">
        <Link to="/Men" className="hover:text-purple-700">Men</Link>
        <Link to="/women" className="hover:text-purple-700">Women</Link>
        <Link to="/Accesories" className="hover:text-purple-700">Accesories</Link>
      </div>

      <div className="flex items-center gap-4 relative">
        <form onSubmit={handleSearch} className="relative hidden sm:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-700"
          >
            <FaSearch />
          </button>
        </form>

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="text-xl hover:text-purple-700 relative">
          <FaHeart />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="text-xl hover:text-purple-700 relative">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Info / Login */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowModal(!showModal)}
              className="flex items-center gap-2 hover:text-purple-700"
            >
              <FaUserCircle />
              <span className="text-sm">
                {user.role === "admin" ? `Admin (${user.email})` : user.email}
              </span>
            </button>

            {showModal && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md p-4 w-48 z-50">
                <p className="text-sm text-gray-600 mb-2">
                  Hello, {user.role === "admin" ? "Admin" : "User"}<br />
                  {user.email}
                </p>
                <Link to="/profile" className="block py-1 text-purple-700 hover:underline">
                  Profile
                </Link>
                <Link to="/Orderhistory" className="block py-1 text-purple-700 hover:underline">
                  Order History
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setShowModal(false);
                  }}
                  className="text-red-500 mt-2 text-sm hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-sm hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
