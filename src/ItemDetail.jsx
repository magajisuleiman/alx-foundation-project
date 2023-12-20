import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import rice from "./assets/rice.png"

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
    <div className="flex m-4 gap-4">
      <div className="border w-2/3">
        <h1 className="p-4 border-b text-2xl">Cart (3)</h1>
        <div className="border-b flex justify-between">
          <div className="flex m-4 items-center gap-3">
            <div>
              <img src={ rice } alt="rice" width={ 200 } />
              <p className="text-center font-mono mt-4 text-brandColor cursor-pointer hover:underline">Remove</p>
            </div>
            <div className="font-spectral text-lg font-bold">
              Fried Rice
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex gap-3 m-4 font-mono font-bold">
              <h1>Price:</h1>
              <p>N700</p>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="p-2 bg-brandColor text-3xl text-white">-</div>
              <div className="p-2 text-2xl">1</div>
              <div className="p-2 bg-brandColor text-3xl text-white">+</div>
            </div>
          </div>
        </div>
        <div className="border-b flex justify-between">
          <div className="flex m-4 items-center gap-3">
            <div>
              <img src={ rice } alt="rice" width={ 200 } />
              <p className="text-center font-mono mt-4 text-brandColor cursor-pointer hover:underline">Remove</p>
            </div>
            <div className="font-spectral text-lg font-bold">
              Fried Rice
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex gap-3 m-4 font-mono font-bold">
              <h1>Price:</h1>
              <p>N700</p>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="p-2 bg-brandColor text-3xl text-white">-</div>
              <div className="p-2 text-2xl">1</div>
              <div className="p-2 bg-brandColor text-3xl text-white">+</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex m-4 items-center gap-3">
            <div>
              <img src={ rice } alt="rice" width={ 200 } />
              <p className="text-center font-mono mt-4 text-brandColor cursor-pointer hover:underline">Remove</p>
            </div>
            <div className="font-spectral text-lg font-bold">
              Fried Rice
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="flex gap-3 m-4 font-mono font-bold">
              <h1>Price:</h1>
              <p>N700</p>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="p-2 hover:cursor-pointer bg-brandColor text-3xl text-white">-</div>
              <div className="p-2 text-2xl">1</div>
              <div className="p-2 hover:cursor-pointer bg-brandColor text-3xl text-white">+</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border grow h-60 p-5">
        <div className="text-2xl border-b p-4">Cart Summary</div>
        <div className="flex justify-between border-b p-4 font-mono">
          <div className="">Subtotal</div>
          <div>N1500</div>
        </div>
        <div className="text-center p-4">
          <button className="p-4 bg-brandColor text-white font-mono font-bold border-none">CHECKOUT (N1500)</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
