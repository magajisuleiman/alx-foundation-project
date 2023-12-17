import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://foodie-bh1b.onrender.com/api/v1/menu_item/${itemId}`) // Use the correct API endpoint for fetching an individual item
      .then((response) => response.json())
      .then((data) => {
        setItem(data.menu_item); // Set the fetched item data
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [itemId]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!item) return;
    const total = quantity * item.price;
    const newItem = { ...item, quantity };
    addToCart(newItem);
    console.log(
      `Added ${quantity} ${item.name} to cart. Total price: ${total}`
    );
  };

  const totalPrice = item ? quantity * item.price : 0;

  return (
    <div className="container mt-4">
      {item ? (
        <div className="row">
          <div className="col-md-6">
            <img src={item.image_url} alt={item.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p className="mb-4">Price: NGN {item.price}</p>
            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <p>Total Price: NGN {totalPrice}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetailPage;
