import { create } from "zustand";
import axios from "axios";

const expensesStore = create((set) => ({
  expenses: null,
  createExpenseForm: {
    title: "",
    amount: "",
    date: "",
    category: "",
  },

  fetchExpenses: async () => {
    const { expenses } = expensesStore.getState();
    console.log("attempting to get expenses");

    try {
      // fetch the expenses
      const res = await axios.get("http://localhost:3001/api/v1/expenses", {
        withCredentials: true,
        "Content-Type": "json",
      });

      console.log("response data", res.data.data);

      // set to state
      set({
        expenses: res.data.data,
      });

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
          date: "",
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
