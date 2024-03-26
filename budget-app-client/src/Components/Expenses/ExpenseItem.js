import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem({ date, title, amount, category }) {
  return (
    <ul>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          {category}
          <div className="expense-item__price">${amount}</div>
        </div>
      </Card>
    </ul>
  );
}

export default ExpenseItem;
