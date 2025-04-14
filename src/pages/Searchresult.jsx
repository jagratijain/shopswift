import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        // Get all products from localStorage
        const menProducts = JSON.parse(localStorage.getItem("menProducts")) || [];
        const womenProducts = JSON.parse(localStorage.getItem("womenProducts")) || [];
        const accessoryProducts = JSON.parse(localStorage.getItem("accessoryProducts")) || [];
        
        // Combine all products
        const allProducts = [...menProducts, ...womenProducts, ...accessoryProducts];
        
        // Filter products based on search query
        const filteredProducts = allProducts.filter(product => {
          const searchTerms = query.toLowerCase().split(" ");
          const productName = product.name.toLowerCase();
          const productDescription = (product.description || "").toLowerCase();
          const productCategory = (product.category || "").toLowerCase();
          
          // Check if any search term is found in product name, description, or category
          return searchTerms.some(term => 
            productName.includes(term) || 
            productDescription.includes(term) || 
            productCategory.includes(term)
          );
        });
        
        setResults(filteredProducts);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchProducts();
    }
  }, [query]);

  // Function to add item to cart
  const addToCart = (product) => {
    try {
      // Get current cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if product is already in cart
      const existingItemIndex = cart.findIndex(
        item => item.id === product.id && item.size === (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M")
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({
          ...product,
          quantity: 1,
          size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M",
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
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="mt-2 text-gray-600">
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-gray-400 mb-4" 
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">We couldn't find any products matching your search.</p>
            <Link 
              to="/Home" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                <Link to={`/product/${product.id}`} className="block overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=Product+Image";
                    }}
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-700 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description || "No description available"}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-purple-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;