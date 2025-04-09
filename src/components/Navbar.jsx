import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex justify-between items-center px-6 py-3">
      <div className="text-2xl font-bold text-purple-700">ShopSwift</div>

      <div className="space-x-6 text-lg hidden md:flex">
        <Link to="/men" className="hover:text-purple-700">Men</Link>
        <Link to="/women" className="hover:text-purple-700">Women</Link>
        <Link to="/accessories" className="hover:text-purple-700">Accessories</Link>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative hidden sm:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>

        <Link to="/cart" className="text-xl hover:text-purple-700">
          <FaShoppingCart />
        </Link>

        {user ? (
          <div className="relative">
            <button onClick={() => setShowModal(!showModal)} className="flex items-center gap-2 hover:text-purple-700">
              <FaUserCircle />
              <span className="text-sm">{user.email}</span>
            </button>

            {showModal && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md p-4 w-48 z-50">
                <p className="text-sm text-gray-600 mb-2">Hello, {user.email}</p>
                <Link to="/profile" className="block py-1 text-purple-700 hover:underline">Profile</Link>
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
