import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import expensesStore from "../../Store/expensesStore";

function ExpenseItem({ eid, date, title, amount, category }) {
  const eStore = expensesStore();
  function handleDelete(key) {
    eStore.deleteExpense(key);
  }

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          {category}
          <div className="expense-item__price">${amount}</div>
        </div>
        <button onClick={() => handleDelete(eid)}>X</button>
      </Card>
    </li>
  );
}

export default ExpenseItem;
