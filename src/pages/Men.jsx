// src/pages/Men.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// Import your product images
import men from "../assets/men.jpg";

export default function Men() {
  // Dummy products data for men's category
  const menProducts = [
    { id: 1, name: "Stylish Men Jacket", price: 1999, image: men, category: "men" },
    { id: 6, name: "Casual Men Shirt", price: 899, image: men, category: "men" },
    { id: 12, name: "Formal Men Suit", price: 3499, image: men, category: "men" },
    { id: 13, name: "Men's Denim Jeans", price: 1299, image: men, category: "men" },
    { id: 14, name: "Cotton T-Shirt", price: 599, image: men, category: "men" },
    { id: 15, name: "Winter Sweater", price: 1499, image: men, category: "men" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative">
        <div className="h-80 w-full bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
          <img 
            src={men} 
            alt="Men's Fashion"
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Men's Collection</h1>
            <p className="text-xl text-gray-200 max-w-xl">
              Discover our latest men's fashion with premium quality and stylish designs for every occasion.
            </p>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="px-8 md:px-16 py-10">
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">
            All Items
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            T-Shirts
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Shirts
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Jackets
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Pants
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Accessories
          </button>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Featured Men's Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
      
      {/* Special Offer */}
      <div className="bg-gray-100 px-8 md:px-16 py-16 my-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <span className="bg-gray-900 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl font-bold mb-4">Spring Collection 2025</h2>
            <p className="text-gray-600 mb-6">
              Get 30% off on our new spring collection for men. Quality fabrics with contemporary designs for the modern man.
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition">
              Shop Collection
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src={men} 
              alt="Spring Collection"
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
      
      {/* New Arrivals */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">New Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/shopnow" className="inline-block bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            View All Men's Products
          </Link>
        </div>
      </div>
    </div>
  );
}