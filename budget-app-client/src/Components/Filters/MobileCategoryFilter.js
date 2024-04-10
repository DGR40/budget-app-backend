import "./MobileCategoryFilter.css";

const MobileCategoryFilter = (props) => {
  function dropdownChangeHandler(event) {
    props.onMobileCategoryFilterChange(event.target.value);
  }

  return (
    <select
      onChange={dropdownChangeHandler}
      value={props.selectedMobileCategory}
      className="mobile-category-filter"
      disabled={props.activeCategories.length === 1}
    >
      {props.activeCategories.length !== 1 && (
        <option value={"All"}>All Categories</option>
      )}

      {props.activeCategories.map((c) => {
        {
          return (
            <option value={c} key={c}>
              {c}
            </option>
          );
        }
      })}
    </select>
  );
};

export default MobileCategoryFilter;
