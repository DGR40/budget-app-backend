function MonthlyExpenseFilter(props) {
  function dropdownChangeHandler(event) {
    props.onMonthlyFilterChange(event.target.value);
  }

  return (
    <div className="expenses-filter" id="expenses-filter__monthly">
      <div className="expenses-filter__control">
        <select onChange={dropdownChangeHandler} value={props.selected}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
    </div>
  );
}

export default MonthlyExpenseFilter;
