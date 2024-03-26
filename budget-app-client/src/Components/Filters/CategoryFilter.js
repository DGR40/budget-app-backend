import { useState } from "react";
import CategoryFilterBubble from "./CategoryFilterBubble.js";
import "./CategoryFilter.css";
import Card from "../UI/Card.js";

function CategoryFilter(props) {
  const categories = [
    "Food and Drink",
    "Shopping",
    "Entertainment",
    "Rent",
    "Subscriptions",
    "Transportation",
  ];

  function categoryChangeHandler(value) {
    // call up to the filter zone
    props.onCategoryChange(value);
  }

  function getClass(category, c) {
    if (category === c) {
      return "selected bubble";
    } else {
      return "bubble";
    }
  }

  return (
    <Card className="category-bar card">
      <div className="categories">
        {categories.map((c) => {
          {
            return (
              <CategoryFilterBubble
                type={c}
                onCategoryChange={categoryChangeHandler}
                key={c}
                className={getClass(props.selectedCategory, c)}
              ></CategoryFilterBubble>
            );
          }
        })}
      </div>
    </Card>
  );
}

export default CategoryFilter;
