import "./ExpenseForm.css";
import React, { useState } from "react";
import expensesStore from "../../Store/expensesStore";
import useInput from "../../Hooks/use-input";

function ExpenseForm(props) {
  const [titleValid, setTitleValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const isNotEmpty = (value) => value.trim() !== "";

  const eStore = expensesStore();

  function onCancelExpenseHandler() {
    props.onClearExpense();
  }

  function submitHandler(e) {
    e.preventDefault();

    let formValid = true;

    if (!eStore.createExpenseForm.title) {
      setTitleValid(false);
      formValid = false;
    } else {
      setTitleValid(true);
    }
    if (!eStore.createExpenseForm.amount) {
      setAmountValid(false);
      formValid = false;
    } else {
      setAmountValid(true);
    }

    if (eStore.createExpenseForm.category === "Pick") {
      setCategoryValid(false);
      formValid = false;
    } else {
      setCategoryValid(true);
    }

    if (formValid) {
      // form valid, run createExpense from eStore
      eStore.createExpense(e);
      props.onSubmitExpense();
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
            value={eStore.createExpenseForm.title}
            onChange={(e) => {
              eStore.updateExpenseForm(e);
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
            value={eStore.createExpenseForm.amount}
            onChange={(e) => {
              eStore.updateExpenseForm(e);
            }}
            placeholder="200"
          />
          {!amountValid && <label>Please enter an amount...</label>}
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={eStore.createExpenseForm.date}
            name="date"
            min="2019-01-01"
            max="2025-01-01"
            onChange={(e) => {
              eStore.updateExpenseForm(e);
            }}
            placeholder="today"
          />
        </div>
        <div className="new-expense__control">
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => {
              eStore.updateExpenseForm(e);
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
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
