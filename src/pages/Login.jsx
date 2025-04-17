import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Admin credentials
  const ADMIN_EMAIL = "admin@shopswift.com";
  const ADMIN_PASSWORD = "jaggs123";

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
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
    console.log("Login attempt:", email, password);
    
    try {
      // Check if login is for admin
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("Admin credentials match, proceeding with admin login");
        
        // Store admin status and info in localStorage
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("displayName", "Admin User");
        
        // Get the base path for navigation
        const basePath = getBasePath();
        const homePath = `${basePath}/Home`;
        
        console.log(`Navigating to: ${homePath}`);
        
        // Try multiple navigation approaches
        try {
          // Approach 1: Use React Router navigate with number (history index)
          navigate(1);
        } catch (navError) {
          console.error("Navigate approach 1 failed:", navError);
          
          try {
            // Approach 2: Use window.location with the calculated path
            window.location.href = homePath;
          } catch (locError) {
            console.error("Navigate approach 2 failed:", locError);
            
            // Approach 3: Last resort - replace the entire URL
            window.location.replace(homePath);
          }
        }
        return;
      }
      
      // For regular user login, validate form
      if (!validateForm()) return;

      // Proceed with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store user info in localStorage
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userEmail", email);
      
      // If Firebase provides a display name, store that too
      if (userCredential.user.displayName) {
        localStorage.setItem("displayName", userCredential.user.displayName);
      }
      
      // Get the base path for navigation
      const basePath = getBasePath();
      const homePath = `${basePath}/home`;
      
      console.log(`Regular user login successful, navigating to: ${homePath}`);
      
      // Try the same navigation approaches as with admin
      try {
        navigate(1);
      } catch (navError) {
        console.error("Navigate approach 1 failed:", navError);
        
        try {
          window.location.href = homePath;
        } catch (locError) {
          console.error("Navigate approach 2 failed:", locError);
          window.location.replace(homePath);
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMsg("Invalid email or password. Please try again.");
    }
  };

  // Debug hook to check router status
  useEffect(() => {
    console.log("Login component mounted");
    console.log("Current URL:", window.location.href);
    console.log("Current path:", window.location.pathname);
    console.log("Current navigate function:", navigate);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login to ShopSwift</h2>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
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
          >
            Login
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