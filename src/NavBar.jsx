import React from "react";
import logo from "./assets/logo.svg";
import user from "./assets/user.svg";
import shopping from "./assets/shopping.svg";

function Navbar() {
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
          <a className="hover:text-brandColor font-mono" href="#">
            Menu
          </a>
        </li>
        <li>
          <a className="hover:text-brandColor font-mono" href="#">
            Contact
          </a>
        </li>
      </ul>
      <div className="flex gap-8">
        <img className="text-brandColor" src={shopping} alt="cart" width={40} />
        <a href="/register">
          <img src={user} alt="user-pix" width={40} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
