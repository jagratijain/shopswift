// src/pages/Women.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// Import your product images
import women from "../assets/women.avif";

export default function Women() {
  // Dummy products data for women's category
  const womenProducts = [
    { id: 2, name: "Trendy Women Dress", price: 1499, image: women, category: "women" },
    { id: 5, name: "Summer Kurti", price: 1199, image: women, category: "women" },
    { id: 18, name: "Floral Maxi Dress", price: 1899, image: women, category: "women" },
    { id: 19, name: "Casual Blouse", price: 899, image: women, category: "women" },
    { id: 20, name: "Denim Skirt", price: 1299, image: women, category: "women" },
    { id: 21, name: "Evening Gown", price: 2499, image: women, category: "women" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative">
        <div className="h-80 w-full bg-gradient-to-r from-pink-600 to-purple-700 overflow-hidden">
          <img 
            src={women} 
            alt="Women's Fashion"
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Women's Collection</h1>
            <p className="text-xl text-gray-200 max-w-xl">
              Explore our latest women's fashion with stylish designs for every season and occasion.
            </p>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="px-8 md:px-16 py-10">
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-500 transition">
            All Items
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Dresses
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Tops
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Bottoms
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Ethnic Wear
          </button>
          <button className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Accessories
          </button>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Featured Women's Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
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
      
      {/* Seasonal Collection */}
      <div className="bg-pink-50 px-8 md:px-16 py-16 my-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <span className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full inline-block mb-4">
              New Season
            </span>
            <h2 className="text-3xl font-bold mb-4">Summer Collection 2025</h2>
            <p className="text-gray-600 mb-6">
              Discover our vibrant summer collection featuring lightweight fabrics and beautiful prints perfect for the warm season.
            </p>
            <button className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-500 transition">
              Shop Summer Collection
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src={women} 
              alt="Summer Collection"
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
      
      {/* New Arrivals */}
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-2xl font-bold mb-8 pb-2 border-b">New Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {womenProducts.slice(0, 4).map((product) => (
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
          <Link to="/shopnow" className="inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-500 transition">
            View All Women's Products
          </Link>
        </div>
      </div>
      
      {/* Style Guide */}
      <div className="bg-gray-50 px-8 md:px-16 py-16 my-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Style Guide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest style tips and outfit inspirations for every occasion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img 
              src={women} 
              alt="Casual Wear" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Casual Chic</h3>
            <p className="text-gray-600 mb-4">Effortless styles for your everyday wardrobe.</p>
            <Link to="/shopnow" className="text-pink-600 font-medium hover:underline">
              Explore Styles →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img 
              src={women} 
              alt="Workwear" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Office Elegance</h3>
            <p className="text-gray-600 mb-4">Professional outfits that make a statement.</p>
            <Link to="/shopnow" className="text-pink-600 font-medium hover:underline">
              Explore Styles →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img 
              src={women} 
              alt="Party Wear" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Evening Glamour</h3>
            <p className="text-gray-600 mb-4">Stunning outfits for special occasions.</p>
            <Link to="/shopnow" className="text-pink-600 font-medium hover:underline">
              Explore Styles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}