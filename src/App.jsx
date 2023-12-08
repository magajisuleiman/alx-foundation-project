import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Hero from "./Hero";
import Footer from "./Footer";
import Menu from "./Menu";
import MenuCard from "./MenuCard";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/" element={<Hero />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
