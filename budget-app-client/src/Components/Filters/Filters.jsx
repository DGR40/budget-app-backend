import "./Filters.css";
import MonthlyExpenseFilter from "./MonthlyExpenseFilter";
import ExpenseFilter from "./ExpenseFilter";

const Filters = (props) => {
  return (
    <div className="filter">
      <div className="time-filter-section">
        <div className="time-filter">
          <div className="time-filter__control">
            {props.yearMode ? (
              <div className="time-filter__control_left">
                <p>Yearly Expenses from</p>
                <ExpenseFilter
                  onYearlyFilterChange={props.onYearlyFilterChange}
                />
              </div>
            ) : (
              <div className="time-filter__control_left">
                <p>Monthly Expenses from</p>
                <MonthlyExpenseFilter
                  onMonthlyFilterChange={props.onMonthlyFilterChange}
                  selected={props.selectedMonth}
                />
                <ExpenseFilter
                  onYearlyFilterChange={props.onYearWithMonthFilterChange}
                />
              </div>
            )}
            <button
              onClick={props.onModeChange}
              className="filter-button"
              type="radio"
            >
              {!props.yearMode
                ? "View Yearly Overview"
                : "View Monthly Overview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
