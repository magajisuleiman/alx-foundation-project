// CartModal.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartModal = ({ handleClose }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    addToCart(updatedCartItems);
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    addToCart(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    addToCart(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      {/* ... (existing modal code) */}
      <div className="modal-body">
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price * item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => decreaseQuantity(item.id)}> - </button>
            <button onClick={() => increaseQuantity(item.id)}> + </button>
          </div>
        ))}
        <div>
          <strong>Total Price: {calculateTotalPrice()}</strong>
        </div>
      </div>
      {/* ... (existing modal code) */}
    </div>
  );
};

export default CartModal;
