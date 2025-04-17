import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Backend API URL
  const API_URL = "http://localhost:5000/api"; // Change this to your backend URL

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setUsernameError("");
    setPasswordError("");

    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        valid = false;
      }
    } else {
      // Username validation
      if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters long.");
        valid = false;
      }
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    return valid;
  };

  // Check if URL has a base path
  const getBasePath = () => {
    // Get the current path and remove the '/login' part
    const currentPath = window.location.pathname;
    return currentPath.replace('/Login', '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", loginMethod === "email" ? email : username, password);
    
    // For development/testing - hardcoded admin credentials
    // In production, remove this and use only the database authentication
    const ADMIN_EMAIL = "admin@shopswift.com";
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "jaggs123";
    
    try {
      // Check if form is valid
      if (!validateForm()) return;
      
      setLoading(true);
      
      // Check if login is admin with hardcoded credentials
      // This is a fallback for development and should be removed in production
      if ((loginMethod === "email" && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) || 
          (loginMethod === "username" && username === ADMIN_USERNAME && password === ADMIN_PASSWORD)) {
        console.log("Admin credentials match, proceeding with admin login");
        
        // Store admin status and info in localStorage
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("userEmail", ADMIN_EMAIL);
        localStorage.setItem("username", ADMIN_USERNAME);
        localStorage.setItem("displayName", "Admin User");
        localStorage.setItem("userId", "admin");
        
        // Navigate to home page
        const basePath = getBasePath();
        navigate('/home');
        return;
      }
      
      // MySQL-based authentication - updated endpoint to match backend
      const response = await axios.post(`${API_URL}/login`, {
        [loginMethod]: loginMethod === "email" ? email : username,
        password: password,
        loginMethod: loginMethod // Tell the backend which login method we're using
      });
      
      // Store authentication data
      const userData = response.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userEmail", userData.user.email);
      localStorage.setItem("username", userData.user.username);
      localStorage.setItem("displayName", userData.user.name || userData.user.username);
      localStorage.setItem("userId", userData.user.id);
      localStorage.setItem("isAdmin", userData.user.role === "admin" ? "true" : "false");
      
      console.log("Login successful, navigating to home");
      
      // Navigate to home page
      const basePath = getBasePath();
      navigate('/home');
      
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Server responded with an error
        setErrorMsg(error.response.data.message || "Invalid credentials. Please try again.");
      } else if (error.request) {
        // Request was made but no response
        setErrorMsg("Unable to connect to the server. Please try again later.");
      } else {
        // Something else happened
        setErrorMsg("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debug hook to check router status
  useEffect(() => {
    console.log("Login component mounted");
    console.log("Current URL:", window.location.href);
    console.log("Current path:", window.location.pathname);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login to ShopSwift</h2>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`px-4 py-2 text-sm font-medium ${
                loginMethod === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              } rounded-l-lg border border-blue-600`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("username")}
              className={`px-4 py-2 text-sm font-medium ${
                loginMethod === "username"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              } rounded-r-lg border border-blue-600`}
            >
              Username
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {loginMethod === "email" ? (
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  emailError ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  usernameError ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                }`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Admin access: admin@shopswift.com / jaggs123</p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;