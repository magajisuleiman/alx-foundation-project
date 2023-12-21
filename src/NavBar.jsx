import React, { useContext, useState } from "react";
import logo from "./assets/logo.svg";
import user from "./assets/user.svg";
import shopping from "./assets/shopping.svg";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };
  return (
    <nav className="bg-white shadow flex p-3 justify-between">
      <a href="/hero">
        <img src={logo} alt="logo-pix" width={50} />
      </a>
      <ul className="flex justify-around gap-10 text-2xl items-center">
        <li>
          <a className="hover:text-brandColor font-mono" href="/hero">
            Home
          </a>
        </li>
        <li>
          <a className="hover:text-brandColor font-mono" href="#">
            About
          </a>
        </li>
        <li>
          <a className="hover:text-brandColor font-mono" href="/menu">
            Menu
          </a>
        </li>
        <li>
          <a className="hover:text-brandColor font-mono" href="#">
            Contact
          </a>
        </li>
        {isLoggedIn && (
          <li>
            <a className="hover:text-brandColor font-mono" href="/profile">
              Profile
            </a>
          </li>
        )}
      </ul>
      {isLoggedIn && (
        <div className="flex gap-8">
          <a href="/cart">
            <img
              className="text-brandColor"
              src={shopping}
              alt="cart"
              width={40}
            />
          </a>
          <div className="cart">
            <a href="/cart">
              <span className="fa fa-shopping-cart my-cart-icon">
                <span className="badge badge-notify my-cart-badge">
                  ({cartItems.length})
                </span>
              </span>
            </a>
          </div>
          <button className="logout" onClick={handleLogout}>
            <h5>Logout</h5>
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex gap-8">
          <a href="/register">
            <img src={user} alt="register" width={40} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
