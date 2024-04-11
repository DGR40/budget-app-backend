import ExpenseItem from "./ExpenseItem";

function MonthlyExpenses(props) {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No Expenses Found</h2>;
  }

  return props.items.map((expense) => (
    <ExpenseItem
      key={expense.id}
      title={expense.title}
      amount={expense.amount}
      date={expense.date}
    ></ExpenseItem>
  ));
}
export default MonthlyExpenses;
