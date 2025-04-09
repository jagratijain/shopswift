// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ image, name, price }) {
  return (
    <div className="min-w-[200px] bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-purple-700 font-bold mt-2">₹{price}</p>
      </div>
    </div>
  );
}
