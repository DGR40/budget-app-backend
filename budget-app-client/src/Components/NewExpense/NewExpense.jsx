import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";
import authStore from "../../Store/authStore";
import { useNavigate } from "react-router-dom";

function NewExpense(props) {
  const aStore = authStore();
  const navigate = useNavigate();
  const [addExpenseShowing, setAddExpenseShowing] = useState(false);

  async function logoutHandler() {
    await aStore.logout();
  }

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
    <>
      <button
        className="new-expense-button"
        id="add-button"
        onClick={onAddExpenseHandler}
      >
        Add Expense
      </button>
      <button
        className="toolbar-button"
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </button>
    </>
  );

  if (addExpenseShowing) {
    toolBar = (
      <>
        <ExpenseForm
          onSubmitCreateExpense={onSubmitExpenseHandler}
          onClearExpense={onClearExpenseHandler}
          mode={props.mode}
        />
      </>
    );
  }

  return (
    <div className={`new-expense ${addExpenseShowing && "justify-center"}`}>
      {toolBar}
    </div>
  );
}

export default NewExpense;
