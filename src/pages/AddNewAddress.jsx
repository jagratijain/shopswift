// src/pages/AddNewAddress.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddNewAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
    isDefault: false
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Get existing addresses from localStorage or initialize empty array
      const existingAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
      
      // Create new address object with unique ID
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      let updatedAddresses;
      
      if (formData.isDefault) {
        // Mark all other addresses as non-default
        updatedAddresses = existingAddresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
        
        // Add new address as default
        updatedAddresses.push(newAddress);
        
        // Also update the shipping address for checkout
        localStorage.setItem("shippingAddress", JSON.stringify(newAddress));
      } else {
        // If this is the first address, make it default
        if (existingAddresses.length === 0) {
          newAddress.isDefault = true;
          localStorage.setItem("shippingAddress", JSON.stringify(newAddress));
        }
        
        // Add new address to existing addresses
        updatedAddresses = [...existingAddresses, newAddress];
      }
      
      // Save updated addresses to localStorage
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
      
      // Navigate back to profile page with addresses tab active
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Address</h1>
          <button
            onClick={() => navigate("/profile")}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="10-digit mobile number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1*
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="House No., Building Name, Street"
                />
                {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Apartment, Suite, Unit, Landmark, etc."
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your state"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code*
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="6-digit PIN code"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      value="home"
                      checked={formData.addressType === "home"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Home</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      value="work"
                      checked={formData.addressType === "work"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Work</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      value="other"
                      checked={formData.addressType === "other"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Other</span>
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;