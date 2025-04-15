import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FashionAdvisor from "../components/FashionAdvisor";

import women from "../assets/women.avif";
import men from "../assets/men.jpg";
import watch from "../assets/watch.jpeg";
import earing from "../assets/earing.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
        {/* Text */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Premium Quality</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4 text-gray-900">
            Build exactly the <br /> 
            <span className="text-purple-700">eCommerce</span> website you want
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            ShopSwift is a customizable, modern eCommerce platform designed to
            give you control. Get started now and transform your online business.
          </p>
          <div className="space-x-4">
            <Link to="/Shopnow" className="bg-purple-700 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-800 transition duration-300 shadow-md hover:shadow-lg">
              Shop Now
            </Link>
            <Link to="/register" className="bg-white text-purple-700 border border-purple-700 px-6 py-3 rounded-md font-medium hover:bg-purple-50 transition duration-300">
              Create Account
            </Link>
          </div>
        </div>
        
        {/* Images */}
        <div className="grid grid-cols-2 gap-4 md:w-1/2 relative">
          <img
            src={women}
            alt="Women's Fashion"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 z-10"
          />
          <img
            src={men}
            alt="Men's Fashion"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 z-10"
          />
          <img
            src={watch}
            alt="Premium Watch"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 z-10"
          />
          <img
            src={earing}
            alt="Elegant Earrings"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 z-10"
          />
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-200 rounded-full opacity-50 blur-xl"></div>
        </div>
      </section>
      
      {/* AI Fashion Advisor Section */}
      <section className="px-8 md:px-16 py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Powered by Gemini AI</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Your Personal Fashion Advisor</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Not sure what to wear? Our AI-powered fashion advisor can help you find the perfect outfit for any occasion.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <FashionAdvisor />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="px-8 md:px-16 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Shop By Category</h2>
          <p className="text-gray-600 mt-2">Find the perfect items across our collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/men" className="group">
            <div className="relative overflow-hidden rounded-lg h-64 shadow-md">
              <img 
                src={men} 
                alt="Men's Fashion" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Men</h3>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full">
                  View Collection →
                </span>
              </div>
            </div>
          </Link>
          
          <Link to="/women" className="group">
            <div className="relative overflow-hidden rounded-lg h-64 shadow-md">
              <img 
                src={women} 
                alt="Women's Fashion" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Women</h3>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full">
                  View Collection →
                </span>
              </div>
            </div>
          </Link>
          
          <Link to="/accessories" className="group">
            <div className="relative overflow-hidden rounded-lg h-64 shadow-md">
              <img 
                src={watch} 
                alt="Accessories" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Accessories</h3>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full">
                  View Collection →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="px-8 md:px-16 py-16 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Handpicked items for your wardrobe</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/Shopnow" className="text-purple-700 font-medium hover:underline flex items-center">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ProductCard image={men} name="Stylish Men Jacket" price={1999} />
          <ProductCard image={women} name="Trendy Women Dress" price={1499} />
          <ProductCard image={watch} name="Elegant Watch" price={2999} />
          <ProductCard image={earing} name="Gold Earrings" price={799} />
          <ProductCard image={women} name="Summer Kurti" price={1199} />
        </div>
      </section>
      
      {/* Special Offer Section */}
      <section className="px-8 md:px-16 py-16 bg-purple-700 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block bg-purple-900/50 px-3 py-1 rounded-full text-sm font-medium mb-4">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 20% Off on All Summer Collection</h2>
              <p className="mb-6 text-purple-100">Don't miss out on our exclusive summer deal. Refresh your wardrobe today!</p>
              <Link to="/Shopnow" className="inline-block bg-white text-purple-700 px-6 py-3 rounded-md font-medium hover:bg-purple-100 transition duration-300">
                Shop Now
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={women} 
                alt="Summer Collection" 
                className="w-3/4 rounded-lg shadow-lg shadow-purple-900/30"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="px-8 md:px-16 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Don't just take our word for it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex text-yellow-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">"The quality of the clothing is excellent! Fast shipping and the fit was perfect. Will definitely shop here again."</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                A
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Arjun Sharma</p>
                <p className="text-gray-500 text-sm">Loyal Customer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex text-yellow-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">"I love my new dress! The material is high quality and the design is exactly as pictured. Customer service was also very helpful."</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                P
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Priya Singh</p>
                <p className="text-gray-500 text-sm">Fashion Enthusiast</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex text-yellow-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69-.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">"The watch I purchased exceeded my expectations. Beautiful design and fantastic value for money. Highly recommended!"</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                R
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Rahul Sharma</p>
                <p className="text-gray-500 text-sm">Watch Collector</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="px-8 md:px-16 py-16 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for the latest product updates, exclusive offers, and fashion tips.</p>
          
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button 
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-800 transition duration-300 sm:whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="px-8 md:px-16 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
          <p className="text-gray-600 mt-2">Discover the ShopSwift difference</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
            <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
            <p className="text-gray-600">We source the best quality products for our customers.</p>
          </div>
          
          <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
            <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping to your doorstep.</p>
          </div>
          
          <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
            <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-gray-600">Hassle-free return policy for your peace of mind.</p>
          </div>
          
          <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
            <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our customer service team is always here to help.</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="px-8 md:px-16 py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to start shopping?</h2>
            <p className="text-purple-100">Browse our collections and find your perfect style today.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link to="/Shopnow" className="inline-block bg-white text-purple-700 px-6 py-3 rounded-md font-medium hover:bg-purple-100 transition duration-300">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}