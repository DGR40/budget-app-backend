import "./ExpenseForm.css";
import React, { useState } from "react";
import expensesStore from "../../Store/expensesStore";
import { faTrash, faCheck, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ExpenseForm({
  onSubmitCreateExpense,
  onClearExpense,
  onSubmitEditExpense,
  mode,
  eid,
}) {
  const [titleValid, setTitleValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const isNotEmpty = (value) => value.trim() !== "";

  const eStore = expensesStore();

  var form = "";

  if (mode === "add") {
    form = eStore.createExpenseForm;
  } else {
    form = eStore.editExpenseForm;
  }

  function onCancelExpenseHandler() {
    onClearExpense();
  }

  async function submitHandler(e) {
    e.preventDefault();
    let formValid = true;

    console.log("FC: ", form.category);

    if (!form.title) {
      console.log("title blank!");
      setTitleValid(false);
      formValid = false;
    } else {
      setTitleValid(true);
    }
    if (!form.amount) {
      setAmountValid(false);
      formValid = false;
    } else {
      setAmountValid(true);
    }
    if (form.category === "Pick" || !form.category) {
      setCategoryValid(false);
      formValid = false;
    } else {
      setCategoryValid(true);
    }

    if (formValid) {
      if (mode === "add") {
        e.preventDefault();
        // form valid, run createExpense from eStore
        await eStore.createExpense(e);
        onSubmitCreateExpense();
      } else {
        await eStore.editExpense(e);
        await eStore.fetchExpenses();
        onSubmitEditExpense();
      }
    }
  }

  function getDateForDatePicker(full) {
    console.log("get full year", full);
    let dateObj = {};
    if (mode === "edit") {
      dateObj = new Date(full);
    } else {
      dateObj = full;
    }
    var year = dateObj.getFullYear();
    var month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    var day = String(dateObj.getDate()).padStart(2, "0");

    var formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <form
      onSubmit={submitHandler}
      className={mode === "edit" ? "edit-form" : ""}
    >
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => {
              if (mode === "add") {
                eStore.updateExpenseForm(e);
              } else {
                eStore.updateEditExpenseForm(e);
              }
            }}
            placeholder="Ex: New TV"
            className={mode === "add" && "add-form-input"}
          />
          {!titleValid && (
            <label className="error-text">Please enter a title...</label>
          )}
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(e) => {
              if (mode === "add") {
                eStore.updateExpenseForm(e);
              } else {
                eStore.updateEditExpenseForm(e);
              }
            }}
            placeholder="200"
            className={mode === "add" ? "add-form-input" : ""}
          />
          {!amountValid && (
            <label className="error-text">Please enter an amount...</label>
          )}
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={getDateForDatePicker(form.date)}
            name="date"
            min="2019-01-01"
            max="2025-01-01"
            onChange={(e) => {
              if (mode === "add") {
                eStore.updateExpenseForm(e);
              } else {
                eStore.updateEditExpenseForm(e);
              }
            }}
            className={mode === "add" && "add-form-input"}
            placeholder="today"
          />
        </div>
        <div className="new-expense__control">
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => {
              if (mode === "add") {
                eStore.updateExpenseForm(e);
              } else {
                eStore.updateEditExpenseForm(e);
              }
            }}
            value={form.category}
            className={mode === "add" && "add-form-input"}
          >
            <option value="Pick">Choose a category below</option>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Transportation">Transportation</option>
          </select>
          {!categoryValid && (
            <label className="error-text">Please select a category...</label>
          )}
        </div>
      </div>
      {mode === "add" && (
        <div className={"new-expense__actions_edit"}>
          <button
            className="new-expense-button delete"
            onClick={onCancelExpenseHandler}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button type="submit" className="new-expense-button">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}
      {mode === "edit" && (
        <div className={"new-expense__actions_edit"}>
          <button
            className="new-expense-button delete"
            onClick={() => {
              eStore.deleteExpense(form._id);
              eStore.setIsEditing(false);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button type="submit" className="new-expense-button">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}
    </form>
  );
}

export default ExpenseForm;
