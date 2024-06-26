import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

function ExpensesList(props) {
  function searchHandler(event) {
    //call up
    props.onSearch(event.target.value);
  }

  return (
    <div>
      <div className="expense-list__total">
        {props.items.length} Item{props.items.length === 1 ? "" : "s"}
        <input
          type="text"
          value={props.searchTerm}
          onChange={searchHandler}
          className="expenses-list__search"
          placeholder="Search Expenses here..."
        ></input>
      </div>
      <ul className="expenses-list">
        {props.items.map((expense) => (
          <ExpenseItem
            key={expense._id}
            eid={expense._id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            category={expense.category}
            expense={expense}
          ></ExpenseItem>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesList;
