import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Hero from "./Hero";
import Footer from "./Footer";
import Menu from "./Menu";
import MenuCard from "./MenuCard";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemDetailPage from "./ItemDetail";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <Router>
      <div className="App">
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/" element={<Hero />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menucard" element={<MenuCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/item/:itemId" element={<ItemDetailPage />} />
          </Routes>
          <Footer />
        </CartProvider>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
