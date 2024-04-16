import { create } from "zustand";
import axios from "axios";
import { parseISO } from "date-fns";

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
    set({ isEditing: value });
  },

  fetchExpenses: async (date) => {
    const { expenses } = expensesStore.getState();
    const { eTag } = expensesStore.getState();

    try {
      // fetch the expenses
      const res = await axios.get("api/v1/expenses", {
        withCredentials: true,
        "Content-Type": "json",
        "If-None-Match": eTag,
      });

      // set to state
      set({
        expenses: res.data.data,
      });

      set({ eTag: res.data.ETag });
    } catch (err) {}
  },

  updateExpenseForm: (e) => {
    const { name, value } = e.target;

    let cleanValue = "";

    if (name === "date") {
      cleanValue = parseISO(value);
    } else {
      cleanValue = value;
    }

    set((state) => {
      return {
        createExpenseForm: {
          ...state.createExpenseForm,
          [name]: cleanValue,
        },
      };
    });
  },

  updateEditExpenseForm: (e) => {
    const { name, value } = e.target;

    let cleanValue = "";

    if (name === "date") {
      cleanValue = parseISO(value);
    } else {
      cleanValue = value;
    }

    set((state) => {
      return {
        editExpenseForm: {
          ...state.editExpenseForm,
          [name]: cleanValue,
        },
      };
    });
  },

  initEditExpenseForm: (expense) => {
    set({
      editExpenseForm: {
        _id: expense._id,
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
      },
    });
  },

  editExpense: async (e) => {
    const {
      editExpenseForm: { _id, title, amount, date, category },
      expenses,
    } = expensesStore.getState();
    const { editExpenseForm } = expensesStore.getState();
    try {
      const res = axios.post(`api/v1/expenses/${_id}`, editExpenseForm, {
        withCredentials: true,
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
      const res = await axios.post("api/v1/expenses", createExpenseForm, {
        withCredentials: true,
      });

      // update expenses
      set({
        expenses: [...expenses, res.data.data],
      });

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
      const res = await axios.delete(`api/v1/expenses/${eid}`, {
        withCredentials: true,
      });

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
