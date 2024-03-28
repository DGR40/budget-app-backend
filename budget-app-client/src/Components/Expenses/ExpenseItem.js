import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import expensesStore from "../../Store/expensesStore";
import ExpenseForm from "../NewExpense/ExpenseForm";
import { useState } from "react";

function ExpenseItem({ eid, date, title, amount, category, expense }) {
  const eStore = expensesStore();
  const { isEditing } = expensesStore.getState();
  // function handleDelete(key) {
  //   eStore.deleteExpense(key);
  // }
  const [showEdit, setShowEdit] = useState(false);

  function toggleEditMode(title, amount, date, category) {
    if (!showEdit && !eStore.isEditing) {
      eStore.initEditExpenseForm(expense);
      setShowEdit(true);
      eStore.setIsEditing(true);
    }
    if (showEdit) {
      setShowEdit("false");
      eStore.setIsEditing(false);
    }
  }

  return (
    <li>
      <Card>
        {!showEdit && (
          <div className="expense-item">
            <ExpenseDate date={date} />
            <div className="expense-item__description">
              <h2>{title}</h2>
              {category}
              <div className="expense-item__price">${amount}</div>
            </div>
            <button onClick={toggleEditMode}>...</button>
          </div>
        )}
        {showEdit && isEditing && (
          <ExpenseForm
            mode="edit"
            eid={eid}
            onSubmitEditExpense={() => {
              console.log("running on submit edited expense ");
              eStore.fetchExpenses();
              eStore.setIsEditing(false);
              setShowEdit(false);
            }}
            onClearExpense={() => {
              setShowEdit(false);
              eStore.setIsEditing(false);
            }}
          />
        )}
      </Card>
    </li>
  );
}

export default ExpenseItem;
