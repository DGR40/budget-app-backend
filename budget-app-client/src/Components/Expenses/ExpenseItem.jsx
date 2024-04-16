import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import expensesStore from "../../Store/expensesStore";
import ExpenseForm from "../NewExpense/ExpenseForm";
import { useState } from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <li>
      <Card>
        <div className="expense-item">
          {showEdit && isEditing && (
            <ExpenseForm
              mode="edit"
              eid={eid}
              onSubmitEditExpense={() => {
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
          {!showEdit && (
            <>
              <ExpenseDate date={date} />
              <div className="expense-item__description">
                <h2>{title}</h2>
                {category}
                <div className="expense-item__price">
                  {USDollar.format(amount)}
                </div>
              </div>
              <button className="expand" onClick={toggleEditMode}>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </>
          )}
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
