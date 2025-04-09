import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex justify-between items-center px-6 py-3">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-700">ShopSwift</div>

      {/* Center Nav Buttons */}
      <div className="space-x-6 text-lg hidden md:flex">
        <button className="hover:text-purple-700">Men</button>
        <button className="hover:text-purple-700">Women</button>
        <button className="hover:text-purple-700">Accessories</button>
      </div>

      {/* Search and Icons */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden sm:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>

        {/* Icons */}
        <Link to="/profile" className="text-xl hover:text-purple-700">
          <FaUserCircle />
        </Link>
        <Link to="/cart" className="text-xl hover:text-purple-700">
          <FaShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;