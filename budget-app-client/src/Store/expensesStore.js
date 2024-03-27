import { create } from "zustand";
import axios from "axios";

const expensesStore = create((set) => ({
  expenses: null,

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
}));

export default expensesStore;
