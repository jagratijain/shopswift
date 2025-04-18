import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

// Example Product Card Component with Link to Product Detail
const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    image = '/api/placeholder/300/300' // Using placeholder as fallback
  } = product;

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-2 relative">
          <img 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full"
          />
          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:shadow-md z-10">
            <Heart size={18} className="text-gray-600" />
          </button>
        </div>
        <h3 className="font-medium text-gray-900 hover:text-purple-600 transition-colors">{name}</h3>
        <p className="text-gray-800">₹{price}</p>
      </Link>
      <div className="mt-2">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-medium">
          Add to Cart
        </button>
        <button className="w-full mt-2 border border-gray-300 hover:border-gray-400 py-2 rounded text-sm font-medium text-gray-700">
          Select Size
        </button>
      </div>
    </div>
  );
};

// Update your existing ProductGrid to use these product cards
// This is just an example - modify according to your actual implementation
const ProductGrid = () => {
  // Example products data - in your actual app, this might come from props or state
  const products = [
    {
      id: 'mascara', 
      name: 'Essence Mascara Lash Princess',
      price: 99.9,
      image: '/api/placeholder/300/300'
    },
    {
      id: 'eyeshadow',
      name: 'Eyeshadow Palette with Mirror',
      price: 199.89,
      image: '/api/placeholder/300/300'
    },
    {
      id: 'powder',
      name: 'Powder Canister',
      price: 149.9,
      image: '/api/placeholder/300/300'
    }
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shop Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;