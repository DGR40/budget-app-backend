import "./CategoryFilterBubble.css";

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
