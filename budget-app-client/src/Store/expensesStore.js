import { create } from "zustand";
import axios from "axios";

const expensesStore = create((set) => ({
  expenses: null,
  isEditing: false,
  eTag: null,
  createExpenseForm: {
    title: "",
    amount: "",
    date: new Date(),
    category: "",
  },
  editExpenseForm: {
    _id: null,
    title: "init",
    amount: "init",
    date: new Date(),
    category: "init",
  },

  setIsEditing: (value) => {
    const { isEditing } = expensesStore.getState();

    set({ isEditing: value });

    console.log("IS EDITING UPDATED", isEditing);
  },

  fetchExpenses: async (date) => {
    const { expenses } = expensesStore.getState();
    const { eTag } = expensesStore.getState();
    console.log("attempting to get expenses");

    try {
      // fetch the expenses
      const res = await axios.get("http://localhost:3001/api/v1/expenses", {
        withCredentials: true,
        "Content-Type": "json",
        "Cache-Control": "no-cache",
        "If-None-Match": eTag,
      });

      console.log("response data", res.data.data);

      // set to state
      set({
        expenses: res.data.data,
      });

      set({ eTag: res.data.ETag });

      console("NEW EXPENSES", expenses);
    } catch (err) {}
  },

  updateExpenseForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createExpenseForm: {
          ...state.createExpenseForm,
          [name]: value,
        },
      };
    });
  },

  updateEditExpenseForm: (e) => {
    const { editExpenseForm } = expensesStore.getState();
    const { name, value } = e.target;

    console.log("updating edit expense form");

    set((state) => {
      return {
        editExpenseForm: {
          ...state.editExpenseForm,
          [name]: value,
        },
      };
    });

    console.log(editExpenseForm);
  },

  initEditExpenseForm: (expense) => {
    const { editExpenseForm } = expensesStore.getState();
    console.log("running init", expense);
    set({
      editExpenseForm: {
        _id: expense._id,
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
      },
    });
    console.log("new edit expense form", editExpenseForm);
  },

  editExpense: async (e) => {
    const {
      editExpenseForm: { _id, title, amount, date, category },
      expenses,
    } = expensesStore.getState();
    const { editExpenseForm } = expensesStore.getState();
    try {
      console.log("NEW TITLE: ", title);
      const res = axios.post(
        `http://localhost:3001/api/v1/expenses/${_id}`,
        editExpenseForm,
        { withCredentials: true }
      );

      const updatedExpenses = expenses.filter((expense) => {
        return expense._id !== _id;
      });

      // update expenses
      const newExpenses = [...expenses];
      const expenseIndex = expenses.findIndex((expense) => {
        return expense._id === _id;
      });
      newExpenses[expenseIndex] = res.data.data;

      set({
        expenses: newExpenses,
        editExpenseForm: {
          _id: null,
          title,
          amount,
          date,
          category,
        },
      });
    } catch (err) {
      console.log("failed to edit");
    }
  },

  createExpense: async (e) => {
    e.preventDefault();
    const { createExpenseForm, expenses } = expensesStore.getState();
    try {
      // fetch the expenses
      const res = await axios.post(
        "http://localhost:3001/api/v1/expenses",
        createExpenseForm,
        {
          withCredentials: true,
        }
      );

      // update expenses
      set({
        expenses: [...expenses, res.data.data],
      });

      console.log(expenses);

      // clear form
      set({
        createExpenseForm: {
          title: "",
          amount: "",
          date: new Date(),
          category: "",
        },
      });
    } catch (err) {
      console.log("ERROR CREATING EXPENSE");
    }
  },

  deleteExpense: async (eid) => {
    console.log(eid);
    const { expenses } = expensesStore.getState();
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/v1/expenses/${eid}`,
        {
          withCredentials: true,
        }
      );

      const updatedExpenses = expenses.filter((expense) => {
        return expense._id !== eid;
      });

      set({ expenses: updatedExpenses });
    } catch (err) {
      console.log("DELETE FAILED");
    }
  },
}));

export default expensesStore;
