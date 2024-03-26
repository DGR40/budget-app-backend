import { getDefaultNormalizer } from "@testing-library/react";
import "./ExpenseFilter.css";

function ExpenseFilter(props) {
  function dropdownChangeHandler(event) {
    props.onYearlyFilterChange(event.target.value);
  }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <select onChange={dropdownChangeHandler} value={props.selected}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
    </div>
  );
}

export default ExpenseFilter;
