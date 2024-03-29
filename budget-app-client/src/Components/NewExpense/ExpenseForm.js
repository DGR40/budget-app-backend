import "./ExpenseForm.css";
import React, { useState } from "react";
import expensesStore from "../../Store/expensesStore";
import useInput from "../../Hooks/use-input";

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

  function submitHandler(e) {
    e.preventDefault();
    let formValid = true;

    if (!form.title) {
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
    if (form.category === "Pick") {
      setCategoryValid(false);
      formValid = false;
    } else {
      setCategoryValid(true);
    }

    if (formValid) {
      if (mode === "add") {
        e.preventDefault();
        // form valid, run createExpense from eStore
        eStore.createExpense(e);
        onSubmitCreateExpense();
      } else {
        eStore.editExpense(e);
        onSubmitEditExpense();
        eStore.fetchExpenses();
      }
    }
  }

  return (
    <form onSubmit={submitHandler}>
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
          />
          {!titleValid && <label>Please enter a title...</label>}
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
          />
          {!amountValid && <label>Please enter an amount...</label>}
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
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
          >
            <option value="Pick">Choose a category below</option>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Transportation">Transportation</option>
          </select>
          {!categoryValid && <label>Please select a category...</label>}
        </div>
      </div>

      <div className="new-expense__actions">
        <button onClick={onCancelExpenseHandler}>Cancel</button>
        <button type="submit">
          {mode === "add" ? "Add" : "Submit Changes"}
        </button>
        {mode === "edit" && (
          <button onClick={() => eStore.deleteExpense(form._id)}>DELETE</button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
