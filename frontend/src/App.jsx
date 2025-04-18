import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";  // Check if this path is correct
import Women from "./pages/Women";
import Shopnow from './pages/Shopnow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Accesories from "./pages/Accesories";
import Men from "./pages/Men";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Orderhistory from "./pages/Orderhistory";
import Profile from "./pages/Profile";
import AddNewAddress from "./pages/AddNewAddress";
import Trackorder from "./pages/Trackorder";
import Searchresult from "./pages/Searchresult";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import ProductGrid from "./pages/ProductGrid";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";




// Optional private route component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="top-right" autoClose={2000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          {/* Protect these routes */}
          
          <Route path="/Shopnow" element={<PrivateRoute><Shopnow /></PrivateRoute>} />
          <Route path="/women" element={<PrivateRoute><Women /></PrivateRoute>} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Accesories" element={<Accesories />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Address" element={<Address/>} />
          <Route path="/Payment" element={<Payment/>} />
          <Route path="/Confirmation" element={<Confirmation/>} />
          <Route path="/Orderhistory" element={<Orderhistory/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/AddNewAddress" element={<AddNewAddress/>} />
          <Route path="/Trackorder/:orderId" element={<Trackorder />} />
          <Route path="/Searchresult" element={<Searchresult />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ProductGrid" element={<ProductGrid />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
