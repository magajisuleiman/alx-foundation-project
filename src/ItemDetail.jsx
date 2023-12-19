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
    <div className="flex justify-center align-middle container mt-4">
      {item ? (
        <div className="flex justify-center mt-9 mb-9 h-60">
          <div className="">
            <img src={item.image_url} alt={item.name} className="w-full" />
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
            <button
              className="btn btn-danger my-cart-btn my-cart-b"
              data-id={item.id}
              data-name={item.name}
              data-summary={`summary ${item.id}`}
              data-price={item.price}
              data-quantity="1"
              data-image={item.image}
            >
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
