import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

function ExpensesList(props) {
  function searchHandler(event) {
    console.log("search!", event.target.value);
    //call up
    props.onSearch(event.target.value);
  }

  return (
    <Card>
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
    </Card>
  );
}

export default ExpensesList;
