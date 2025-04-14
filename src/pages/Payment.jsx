// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Payment = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get cart items and shipping address from localStorage
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const address = JSON.parse(localStorage.getItem("shippingAddress"));
    
    if (items.length === 0) {
      // Redirect to cart if it's empty
      navigate("/cart");
      return;
    }
    
    if (!address) {
      // Redirect to address page if address not provided
      navigate("/address");
      return;
    }
    
    setCartItems(items);
    setShippingAddress(address);
    setLoading(false);
  }, [navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = calculateTax();
    return subtotal + shipping + tax;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const validateCardDetails = () => {
    const newErrors = {};
    
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      
      if (!cardDetails.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }
      
      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = "Expiry date format should be MM/YY";
      }
      
      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (paymentMethod === "card" && !validateCardDetails()) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing with a timeout
    setTimeout(() => {
      // Create order object
      const order = {
        items: cartItems,
        shippingAddress,
        paymentMethod,
        orderTotal: calculateTotal() + (paymentMethod === "cod" ? 49 : 0),
        orderDate: new Date().toISOString(),
        orderStatus: "Confirmed",
        paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
      };
      
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrders = [...existingOrders, order];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      
      // Clear cart
      localStorage.removeItem("cart");
      
      // Dispatch event to update cart count in navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Redirect to confirmation page
      navigate("/confirmation");
    }, 1500); // Simulate a 1.5 second processing time
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">✓</div>
              <span className="ml-2 font-medium text-gray-700">Address</span>
            </div>
            <div className="w-8 h-1 mx-2 bg-purple-600"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">2</div>
              <span className="ml-2 font-medium text-purple-700">Payment</span>
            </div>
            <div className="w-8 h-1 mx-2 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">3</div>
              <span className="ml-2 font-medium text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center p-4 border rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-3 font-medium">Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => handlePaymentMethodChange("paypal")}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-3 font-medium">PayPal</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => handlePaymentMethodChange("upi")}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-3 font-medium">UPI</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => handlePaymentMethodChange("cod")}
                      className="h-4 w-4 text-purple-600"
                    />
                    <span className="ml-3 font-medium">Cash on Delivery</span>
                  </label>
                </div>
                
                {paymentMethod === "card" && (
                  <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <form>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={cardDetails.cardName}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            placeholder="Name as on card"
                          />
                          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date*
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              placeholder="123"
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                
                {paymentMethod === "paypal" && (
                  <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <div className="text-center">
                      <img 
                        src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png" 
                        alt="PayPal"
                        className="h-10 mx-auto mb-4"
                      />
                      <p className="text-sm text-gray-600 mb-4">
                        Click "Place Order" to complete your purchase using PayPal.
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "upi" && (
                  <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <div className="mb-4">
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID*
                      </label>
                      <input
                        type="text"
                        id="upiId"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="username@ybl"
                      />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-8" />
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      You'll receive a payment request on your UPI app which you need to authorize.
                    </p>
                  </div>
                )}
                
                {paymentMethod === "cod" && (
                  <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <p className="text-sm text-gray-600">
                      Pay in cash when your order is delivered.
                      Additional ₹49 fee applies for cash on delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{shippingAddress.fullName}</p>
                    <p className="text-gray-600 mt-1">{shippingAddress.phoneNumber}</p>
                    <p className="text-gray-600 mt-1">
                      {shippingAddress.addressLine1}
                      {shippingAddress.addressLine2 ? `, ${shippingAddress.addressLine2}` : ""}
                    </p>
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                    </p>
                    <p className="text-gray-600 mt-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {shippingAddress.addressType.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/address")}
                    className="text-purple-600 text-sm hover:text-purple-800"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({cartItems.length} items)</p>
                  <p className="text-gray-900 font-medium">₹{calculateSubtotal()}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900 font-medium">
                    {calculateSubtotal() > 999 ? 'Free' : '₹99'}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (18%)</p>
                  <p className="text-gray-900 font-medium">₹{calculateTax()}</p>
                </div>
                
                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">COD Fee</p>
                    <p className="text-gray-900 font-medium">₹49</p>
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{calculateTotal() + (paymentMethod === "cod" ? 49 : 0)}
                  </p>
                </div>
                
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className={`w-full py-3 rounded-md font-medium transition mt-6 ${
                    processing 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
                
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/address")}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center justify-center"
                    disabled={processing}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;