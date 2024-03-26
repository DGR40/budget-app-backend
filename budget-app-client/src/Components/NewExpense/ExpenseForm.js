import "./ExpenseForm.css";
import React, { useState } from "react";
import { getAuthToken } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";

function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState(new Date());
  const [enteredCategory, setEnteredCategory] = useState("Pick");

  const [titleValid, setTitleValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const navigate = useNavigate();

  function inputChangeHandler(identifier, value) {
    if (identifier === "title") {
      setEnteredTitle(value);
    } else if (identifier === "date") {
      setEnteredDate(value);
    } else if (identifier === "amount") {
      setEnteredAmount(parseFloat(value));
    } else if (identifier === "category") {
      setEnteredCategory(value);
    }
  }

  function onCancelExpenseHandler() {
    props.onClearExpense();
  }

  function submitHandler(event) {
    event.preventDefault();

    let formValid = true;

    if (!enteredTitle) {
      setTitleValid(false);
      formValid = false;
    } else {
      setTitleValid(true);
    }
    if (!enteredAmount) {
      setAmountValid(false);
      formValid = false;
    } else {
      setAmountValid(true);
    }

    if (enteredCategory === "Pick") {
      setCategoryValid(false);
      formValid = false;
    } else {
      setCategoryValid(true);
    }

    if (formValid) {
      const expenseData = {
        title: enteredTitle,
        date: new Date(enteredDate),
        amount: enteredAmount,
        category: enteredCategory,
      };

      console.log(expenseData);
      addExpense(JSON.stringify(expenseData));
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
      setEnteredCategory("");
    }
  }

  async function addExpense(expenseData) {
    const token = getAuthToken();
    const response = await fetch("http://localhost:3001/api/v1/expenses", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: expenseData,
    });
    if (response.ok) {
      console.log("new expense added");
      window.location.reload();
    } else {
      console.log("that didn't work!");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={(event) =>
              inputChangeHandler("title", event.target.value)
            }
            placeholder="Ex: New TV"
          />
          {!titleValid && <label>Please enter a title...</label>}
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={(event) =>
              inputChangeHandler("amount", event.target.value)
            }
            placeholder="200"
          />
          {!amountValid && <label>Please enter an amount...</label>}
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={enteredDate}
            min="2019-01-01"
            max="2025-01-01"
            onChange={(event) => inputChangeHandler("date", event.target.value)}
            placeholder="today"
          />
        </div>
        <div className="new-expense__control">
          <label>Category</label>
          <select
            onChange={(event) =>
              inputChangeHandler("category", event.target.value)
            }
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
