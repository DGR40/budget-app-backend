import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

function NewExpense(props) {
  const [addExpenseShowing, setAddExpenseShowing] = useState(false);

  function onSubmitExpenseHandler(enteredData) {
    const expenseData = {
      ...enteredData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setAddExpenseShowing(false);
  }

  function onClearExpenseHandler() {
    setAddExpenseShowing(false);
  }

  function onAddExpenseHandler() {
    setAddExpenseShowing(true);
  }

  let toolBar = <button onClick={onAddExpenseHandler}>Add Expense</button>;

  if (addExpenseShowing) {
    toolBar = (
      <ExpenseForm
        onSubmitExpense={onSubmitExpenseHandler}
        onClearExpense={onClearExpenseHandler}
      />
    );
  }

  return <div className="new-expense">{toolBar}</div>;
}

export default NewExpense;
