import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import rice from "./assets/jolof.png";
import swallo from "./assets/Swallo.png";
import beans from "./assets/beans.png";
import soups from "./assets/soup.png";
import beverages from "./assets/beverages.png";
import spaghetti from "./assets/spagetti.png";
import deserts from "./assets/desert.png";

function Menu() {
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://foodie-bh1b.onrender.com/api/v1/menu_category")
      .then((response) => response.json())
      .then((data) => {
        setMenuCategories(data.menu_categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const getCategoryItems = () => {
    const category = menuCategories.find(
      (category) => category.name === selectedCategory
    );
    return category ? category.menu_items : [];
  };

  return (
    <div className="mx-auto p-10 gap-8">
      {/* Render categories */}
      <div className="flex justify-around">
        {menuCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              className="min-w-full h-32 rounded-t-md"
              src={category.menu_items[0]?.image_url}
              alt={category.name}
            />
            <h3 className="text-brandColor text-center font-bold font-mono p-1">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Render items based on selected category */}
      {selectedCategory && (
        <div className="grid grid-cols-5 gap-8 mt-8">
          {getCategoryItems().length > 0 ? (
            getCategoryItems().map((item, index) => (
              <div
                key={index}
                className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer"
              >
                <img
                  className="min-w-full h-32 rounded-t-md"
                  src={item.image_url}
                  alt={item.name}
                />
                <h3 className="text-brandColor text-center font-bold font-mono p-1">
                  {item.name}
                </h3>
                <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md">
                  <div>
                    <a href={`/item/${item.id}`}>Select Deal</a>
                  </div>
                  <div>{`NGN ${item.price}`}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No food items here, kindly check back, but for now, check other
              yummy categories
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
