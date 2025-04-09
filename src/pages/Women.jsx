import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

export default function Women() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cart, setCart] = useState([]);
  const loader = useRef(null);

  const categories = [
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
  ];

  const fetchProducts = async () => {
    try {
      const responses = await Promise.all(
        categories.map((cat) =>
          axios.get(`https://dummyjson.com/products/category/${cat}`)
        )
      );
      const combined = responses.flatMap((res) => res.data.products);
      setProducts(combined);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + 8);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const cartItem = { ...product, selectedSize: size };
    setCart((prevCart) => [...prevCart, cartItem]);
    alert(`${product.title} (Size: ${size}) added to cart!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Women's Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="border rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-40 object-cover mb-4"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>

            {/* Size Dropdown */}
            <select
              className="mb-2 border rounded px-2 py-1 text-sm"
              onChange={(e) => handleSizeChange(product.id, e.target.value)}
              value={selectedSizes[product.id] || ""}
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Loader */}
      <div ref={loader} className="h-10 mt-10 flex justify-center items-center">
        <span className="text-sm text-gray-400">Loading more...</span>
      </div>
    </div>
  );
}
