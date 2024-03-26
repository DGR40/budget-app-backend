import "./CategoryFilterBubble.css";
import { useState } from "react";
import Card from "../UI/Card";

const CategoryFilterBubble = (props) => {
  function bubbleChangeHandler(event) {
    props.onCategoryChange(event.target.innerHTML);
  }

  return (
    <div
      className={props.className}
      onClick={bubbleChangeHandler}
      value={props.type}
    >
      {props.type}
    </div>
  );
};
export default CategoryFilterBubble;
