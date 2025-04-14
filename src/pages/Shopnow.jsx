import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// Import your product images
import women from "../assets/women.avif";
import men from "../assets/men.jpg";
import watch from "../assets/watch.jpeg";
import earing from "../assets/earing.jpeg";

export default function Shopnow() {
  // Sample product data - you'll replace this with your API call
  const allProducts = [
    { id: 1, name: "Stylish Men Jacket", price: 1999, image: men, category: "men" },
    { id: 2, name: "Trendy Women Dress", price: 1499, image: women, category: "women" },
    { id: 3, name: "Elegant Watch", price: 2999, image: watch, category: "accessories" },
    { id: 4, name: "Gold Earrings", price: 799, image: earing, category: "accessories" },
    { id: 5, name: "Summer Kurti", price: 1199, image: women, category: "women" },
    { id: 6, name: "Casual Men Shirt", price: 899, image: men, category: "men" },
    { id: 7, name: "Designer Watch", price: 3999, image: watch, category: "accessories" },
    { id: 8, name: "Silver Bracelet", price: 599, image: earing, category: "accessories" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(4000);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on selected criteria
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    const categoryMatch = 
      selectedCategory === "all" || product.category === selectedCategory;
    
    // Filter by price range
    const priceMatch = product.price <= priceRange;
    
    // Filter by search query
    const searchMatch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Now</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="category-all"
                      name="category"
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                    />
                    <label htmlFor="category-all" className="ml-3 text-sm text-gray-600">
                      All Products
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category-men"
                      name="category"
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      checked={selectedCategory === "men"}
                      onChange={() => setSelectedCategory("men")}
                    />
                    <label htmlFor="category-men" className="ml-3 text-sm text-gray-600">
                      Men
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category-women"
                      name="category"
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      checked={selectedCategory === "women"}
                      onChange={() => setSelectedCategory("women")}
                    />
                    <label htmlFor="category-women" className="ml-3 text-sm text-gray-600">
                      Women
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category-accessories"
                      name="category"
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      checked={selectedCategory === "accessories"}
                      onChange={() => setSelectedCategory("accessories")}
                    />
                    <label htmlFor="category-accessories" className="ml-3 text-sm text-gray-600">
                      Accessories
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Max Price: ₹{priceRange}</h3>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹4000</span>
                </div>
              </div>
              
              {/* Reset filters button */}
              <button
                className="w-full bg-gray-100 text-gray-800 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange(4000);
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">{filteredProducts.length}</span> products
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-700 mr-2">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}