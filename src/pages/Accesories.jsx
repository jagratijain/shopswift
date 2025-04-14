// src/pages/Accessories.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// Import your product images
import watch from "../assets/watch.jpeg";
import earing from "../assets/earing.jpeg";

export default function Accessories() {
  // Dummy products data for accessories category
  const accessoriesProducts = [
    { id: 3, name: "Elegant Watch", price: 2999, image: watch, category: "accessories" },
    { id: 4, name: "Gold Earrings", price: 799, image: earing, category: "accessories" },
    { id: 7, name: "Designer Watch", price: 3999, image: watch, category: "accessories" },
    { id: 8, name: "Silver Bracelet", price: 599, image: earing, category: "accessories" },
    { id: 16, name: "Pearl Necklace", price: 1899, image: earing, category: "accessories" },
    { id: 17, name: "Luxury Sunglasses", price: 1299, image: watch, category: "accessories" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative">
        <div className="h-80 w-full bg-gradient-to-r from-purple-800 to-indigo-900 overflow-hidden">
          <img 
            src={watch} 
            alt="Accessories Collection"
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Accessories Collection</h1>
            <p className="text-xl text-gray-200 max-w-xl">
              Complete your look with our premium accessories, from elegant watches to stunning jewelry.
            </p>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="px-8 md:px-16 py-10">
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition">
            All Accessories
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Watches
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Jewelry
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Bags
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Sunglasses
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Belts
          </button>
        </div>
      </div>
      
      {/* Featured Accessories */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Featured Accessories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoriesProducts.map((product) => (
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
      
      {/* Luxury Collection */}
      <div className="bg-gray-50 px-8 md:px-16 py-16 my-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full inline-block mb-4">
              Premium Selection
            </span>
            <h2 className="text-3xl font-bold mb-4">Luxury Watch Collection</h2>
            <p className="text-gray-600 mb-6">
              Discover our exclusive range of luxury watches. Crafted with precision and designed for elegance, these timepieces are the perfect statement for any occasion.
            </p>
            <button className="bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-600 transition">
              Explore Luxury Watches
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src={watch} 
              alt="Luxury Watch Collection"
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
      
      {/* Trending Items */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Trending This Season</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoriesProducts.slice(0, 4).map((product) => (
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
          <Link to="/shopnow" className="inline-block bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-600 transition">
            View All Accessories
          </Link>
        </div>
      </div>
      
      {/* Gift Ideas Section */}
      <div className="bg-purple-50 px-8 md:px-16 py-16 my-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Perfect Gift Ideas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Looking for that special gift? Our accessories make the perfect present for any occasion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img 
              src={watch} 
              alt="Watches" 
              className="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Watches</h3>
            <p className="text-gray-600 mb-4">Elegant timepieces for every style and occasion.</p>
            <Link to="/shopnow" className="text-purple-700 font-medium hover:underline">
              Shop Watches →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img 
              src={earing} 
              alt="Jewelry" 
              className="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Jewelry</h3>
            <p className="text-gray-600 mb-4">Beautiful pieces to complement any outfit.</p>
            <Link to="/shopnow" className="text-purple-700 font-medium hover:underline">
              Shop Jewelry →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img 
              src={watch} 
              alt="Gift Sets" 
              className="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Gift Sets</h3>
            <p className="text-gray-600 mb-4">Curated collections for the perfect present.</p>
            <Link to="/shopnow" className="text-purple-700 font-medium hover:underline">
              Shop Gift Sets →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}