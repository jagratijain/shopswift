import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, Award, Shield, Box, Truck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product data
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock data based on product ID
        const mockProducts = {
          'mascara': {
            id: 'mascara',
            name: 'Essence Mascara Lash Princess',
            price: 99.9,
            originalPrice: 129.9,
            discount: 23,
            rating: 4.7,
            reviewCount: 128,
            inStock: true,
            description: 'Our iconic mascara delivers dramatic volume and length. The cone-shaped fiber brush captures every lash for an eye-opening effect. Made with a nourishing formula that conditions while it enhances.',
            features: [
              'Dramatic volume and length',
              'Smudge-proof formula',
              'Long-lasting up to 12 hours',
              'Easy to remove with warm water',
              'Ophthalmologically tested'
            ],
            colors: ['Black', 'Brown', 'Blue-Black'],
            sizes: ['Standard', 'Mini', 'Waterproof'],
            images: [
              '/images/mascara-1.jpg',
              '/images/mascara-2.jpg',
              '/images/mascara-3.jpg',
            ],
            specifications: {
              'Volume': '10ml',
              'Formulation': 'Cream',
              'Finish': 'Natural',
              'Benefits': 'Lengthening, Volumizing',
              'Suitable for': 'All eye types'
            },
            reviews: [
              {
                id: 1,
                user: 'Mira S.',
                rating: 5,
                date: '2025-03-12',
                title: 'Best mascara I\'ve ever used!',
                comment: 'This mascara gives amazing length and volume without clumping. It stays on all day but comes off easily with makeup remover. Will definitely buy again!',
                helpful: 24
              },
              {
                id: 2,
                user: 'Priya K.',
                rating: 4,
                date: '2025-03-05',
                title: 'Great for everyday use',
                comment: 'I love how this mascara makes my lashes look. The brush is easy to use and the formula doesn\'t flake. Taking off one star because it smudges slightly if I rub my eyes.',
                helpful: 16
              },
              {
                id: 3,
                user: 'Raj T.',
                rating: 5,
                date: '2025-02-28',
                title: 'Worth every rupee',
                comment: 'My wife loves this mascara. She says it\'s comparable to much more expensive brands she\'s tried. Fast delivery too!',
                helpful: 10
              }
            ]
          },
          'eyeshadow': {
            id: 'eyeshadow',
            name: 'Eyeshadow Palette with Mirror',
            price: 199.89,
            originalPrice: 249.9,
            discount: 20,
            rating: 4.5,
            reviewCount: 86,
            inStock: true,
            description: 'A versatile palette featuring 15 highly-pigmented shades in matte, shimmer, and metallic finishes. Create everything from subtle daytime looks to dramatic evening styles with these blendable, long-lasting colors.',
            features: [
              'Highly pigmented colors',
              'Mix of matte and shimmer finishes',
              'Includes built-in mirror',
              'Vegan and cruelty-free',
              'Long-lasting formula'
            ],
            colors: ['Warm Neutrals', 'Cool Tones', 'Rose Gold'],
            sizes: ['15 Shades', '9 Shades'],
            images: [
              '/images/eyeshadow-1.jpg',
              '/images/eyeshadow-2.jpg',
              '/images/eyeshadow-3.jpg',
            ],
            specifications: {
              'Weight': '15g',
              'Formulation': 'Pressed Powder',
              'Finish': 'Mixed (Matte/Shimmer)',
              'Benefits': 'Blendable, Long-lasting',
              'Suitable for': 'All skin types'
            },
            reviews: [
              {
                id: 1,
                user: 'Ananya M.',
                rating: 5,
                date: '2025-03-18',
                title: 'Amazing pigmentation!',
                comment: 'The colors in this palette are gorgeous and so pigmented. They blend beautifully and last all day even without primer. The mirror is a great size too!',
                helpful: 31
              },
              {
                id: 2,
                user: 'Divya S.',
                rating: 4,
                date: '2025-03-10',
                title: 'Great everyday palette',
                comment: 'I use this palette almost daily. The neutral shades are perfect for work, and I can easily build up the darker colors for evening looks. Only wish there was less fallout with the shimmer shades.',
                helpful: 18
              }
            ]
          },
          'powder': {
            id: 'powder',
            name: 'Powder Canister',
            price: 149.9,
            originalPrice: 179.9,
            discount: 17,
            rating: 4.3,
            reviewCount: 64,
            inStock: true,
            description: 'This silky-smooth pressed powder gives a natural matte finish while controlling oil and shine. The lightweight formula blends seamlessly and sets makeup for long-lasting wear. Comes in a sleek compact with mirror.',
            features: [
              'Oil-controlling formula',
              'Natural matte finish',
              'Includes powder puff',
              'Built-in mirror',
              'Suitable for all skin types'
            ],
            colors: ['Translucent', 'Fair', 'Medium', 'Tan', 'Deep'],
            sizes: ['Standard', 'Travel Size'],
            images: [
              '/images/powder-1.jpg',
              '/images/powder-2.jpg',
              '/images/powder-3.jpg',
            ],
            specifications: {
              'Weight': '8g',
              'Formulation': 'Pressed Powder',
              'Finish': 'Matte',
              'Benefits': 'Oil control, Sets makeup',
              'Suitable for': 'All skin types'
            },
            reviews: [
              {
                id: 1,
                user: 'Meera P.',
                rating: 5,
                date: '2025-03-15',
                title: 'Perfect for touch-ups',
                comment: 'I carry this in my bag for touch-ups throughout the day. It controls oil without looking cakey and the compact is very sturdy. Love it!',
                helpful: 12
              },
              {
                id: 2,
                user: 'Arjun K.',
                rating: 4,
                date: '2025-03-01',
                title: 'Good quality powder',
                comment: 'Bought this for my wife and she loves it. Says it keeps her makeup looking fresh all day. The only drawback is that the powder puff is a bit small.',
                helpful: 8
              }
            ]
          }
        };
        
        // Match product based on ID or use first product as fallback
        const productData = mockProducts[id] || Object.values(mockProducts)[0];
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Placeholder for add to cart functionality
  const handleCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      navigate("/Cart");
      return;
    }
    const handleWishlistClick = () => {
        // Add wishlist functionality here
        console.log("Added to wishlist");
        
        // If you want to navigate to the wishlist page
         navigate("/Wishlist");
      };
    
    // Add to cart logic here
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  // Handle navigating back to products page
  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <button 
            onClick={goBack}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-purple-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Products
      </button>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-2/5">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
            <img 
              src="/api/placeholder/400/400" 
              alt={product.name} 
              className="object-contain max-h-full w-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img 
                  src="/api/placeholder/150/150" 
                  alt={`${product.name} thumbnail ${index}`} 
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-3/5">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Rating & Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-yellow-500 font-medium">{product.rating}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-500">{product.reviewCount} reviews</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Inclusive of all taxes
            </p>
          </div>
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-full text-sm ${
                      selectedColor === color 
                        ? 'border-purple-600 bg-purple-50 text-purple-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#size-guide" className="text-sm text-purple-600 hover:text-purple-800">Size guide</a>
              </div>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded text-sm ${
                      selectedSize === size 
                        ? 'border-purple-600 bg-purple-50 text-purple-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded w-32">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-2 py-1 text-center focus:outline-none"
              />
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart & Wishlist */}
          <div className="flex space-x-4 mb-6">
          <button
  onClick={handleCart}
  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded flex items-center justify-center"
>
  <ShoppingCart size={20} className="mr-2" />
  Add to Cart
</button>
             <button
  onClick={() => navigate("/Wishlist")}
  className="p-3 border border-gray-300 rounded hover:bg-gray-50"
>
  <Heart
    size={20}
    className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}
  />
</button>
            <button className="p-3 border border-gray-300 rounded hover:bg-gray-50">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Delivery & Returns */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex items-start mb-4">
              <Truck size={20} className="text-gray-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Fast Delivery</h4>
                <p className="text-sm text-gray-500">Delivery in 2-5 business days</p>
              </div>
            </div>
            <div className="flex items-start">
              <Box size={20} className="text-gray-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-500">30 day return policy</p>
              </div>
            </div>
          </div>
          
          {/* Quality Badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600 text-sm">
              <Check size={16} className="text-green-500 mr-1" />
              <span>Quality Tested</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Shield size={16} className="text-green-500 mr-1" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Award size={16} className="text-green-500 mr-1" />
              <span>Top Rated</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <h3 className="font-medium text-lg mb-3">Features</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="py-4 text-sm font-medium text-gray-900 w-1/4">{key}</td>
                      <td className="py-4 text-sm text-gray-700">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              {/* Review summary */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                  Write a Review
                </button>
              </div>
              
              {/* Review list */}
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{review.title}</h4>
                      <span className="flex">
                        {renderStars(review.rating)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{review.user}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex items-center text-sm">
                      <button className="text-gray-500 hover:text-gray-700 flex items-center">
                        <span className="mr-1">{review.helpful}</span> people found this helpful
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button className="text-purple-600 hover:text-purple-800">
                        Helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-2 relative">
                <img 
                  src="/api/placeholder/300/300" 
                  alt={`Related product ${item}`} 
                  className="object-cover w-full h-full"
                />
             <button 
              onClick={() => navigate("/Wishlist")}
               className="absolute top-2 right-2 bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <Heart size={16} className="text-gray-600" />
         </button>
              </div>
              <h3 className="font-medium text-gray-900">Related Product {item}</h3>
              <p className="text-gray-600">₹{(Math.random() * 200 + 99).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;