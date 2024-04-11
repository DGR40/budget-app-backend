import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";
import expensesStore from "../../Store/expensesStore";

function NewExpense(props) {
  const eStore = expensesStore.getState();
  const [addExpenseShowing, setAddExpenseShowing] = useState(false);

  function onSubmitExpenseHandler(enteredData) {
    setAddExpenseShowing(false);
  }

  function onClearExpenseHandler() {
    setAddExpenseShowing(false);
  }

  function onAddExpenseHandler() {
    setAddExpenseShowing(true);
  }

  let toolBar = (
    <button className="new-expense-button" onClick={onAddExpenseHandler}>
      Add Expense
    </button>
  );

  if (addExpenseShowing) {
    toolBar = (
      <ExpenseForm
        onSubmitCreateExpense={onSubmitExpenseHandler}
        onClearExpense={onClearExpenseHandler}
        mode={props.mode}
      />
    );
  }

  return <div className="new-expense">{toolBar}</div>;
}

export default NewExpense;
