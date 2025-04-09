import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import women from "../assets/women.avif";
import men from "../assets/men.jpg";
import watch from "../assets/watch.jpeg";
import earing from "../assets/earing.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 bg-gray-50">
        {/* Text */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Build exactly the <br /> eCommerce website you want
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            ShopSwift is a customizable, modern eCommerce platform designed to
            give you control. Get started now.
          </p>
          <div className="space-x-4">
            <button className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800">
              Start a new store
            </button>
            <button className="text-purple-700 font-semibold hover:underline">
              Customize and extend
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4 md:w-1/2">
          <img
            src={women}
            alt="Women"
            className="rounded shadow-md hover:scale-105 transition-transform"
          />
          <img
            src={men}
            alt="Men"
            className="rounded shadow-md hover:scale-105 transition-transform"
          />
          <img
            src={watch}
            alt="Watch"
            className="rounded shadow-md hover:scale-105 transition-transform"
          />
          <img
            src={earing}
            alt="Earing"
            className="rounded shadow-md hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="px-8 md:px-16 py-10 bg-white">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300">
          <ProductCard image={men} name="Stylish Men Jacket" price={1999} />
          <ProductCard image={women} name="Trendy Women Dress" price={1499} />
          <ProductCard image={watch} name="Elegant Watch" price={2999} />
          <ProductCard image={earing} name="Gold Earrings" price={799} />
          <ProductCard image={women} name="Summer Kurti" price={1199} />
        </div>
      </section>
    </div>
  );
}
