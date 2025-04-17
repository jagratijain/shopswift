import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Backend API URL
  const API_URL = "http://localhost:5000/api";

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setUsernameError("");
    setNameError("");
    setPasswordError("");
    setConfirmError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters.");
      valid = false;
    }

    if (!name.trim()) {
      setNameError("Please enter your name.");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrorMsg("");
      
      // Send registration request to backend - updated endpoint
      await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        name
      });
      
      // Show success message
      alert("Registration successful! You can now login.");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response) {
        // Show specific error message from server
        setErrorMsg(error.response.data.message || "Registration failed. Please try again.");
      } else if (error.request) {
        // No response received
        setErrorMsg("Unable to connect to the server. Please try again later.");
      } else {
        // Something else happened
        setErrorMsg("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register on ShopSwift</h2>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                usernameError ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
              }`}
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                nameError ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
              }`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
              }`}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                confirmError ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
              }`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;