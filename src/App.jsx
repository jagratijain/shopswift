import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; 


function App() {
  return (
    <BrowserRouter>
      <div className="text-center mt-6 font-bold text-2xl">Welcome to ShopSwift</div>

      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route is Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
