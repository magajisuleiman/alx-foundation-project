import React, { useContext, useState } from "react";
import logo from "./assets/logo.svg";
import user from "./assets/user.svg";
import shopping from "./assets/shopping.svg";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
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
        <li>
          <a className="hover:text-brandColor font-mono" href="/profile">
            Profile
          </a>
        </li>
      </ul>
      <div className="flex gap-8">
        <a href="/register">
          <img
            className="text-brandColor"
            src={shopping}
            alt="cart"
            width={40}
          />
        </a>
        <div className="container-fluid">
          <button className="btn btn-outline-primary" onClick={handleCartClick}>
            Cart ({cartItems.length})
          </button>
          {showCartModal && <CartModal handleClose={handleCloseCartModal} />}
        </div>
        <a href="/register">
          <img src={user} alt="user-pix" width={40} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
