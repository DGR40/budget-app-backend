import { useState, useEffect } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import Filters from "../Filters/Filters";
import CategoryFilter from "../Filters/CategoryFilter";
import Dashboard from "../Dashboard/Dashboard";
import NewExpense from "../NewExpense/NewExpense";
import MobileCategoryFilter from "../Filters/MobileCategoryFilter";
import expensesStore from "../../Store/expensesStore";
import authStore from "../../Store/authStore";

function Expenses({ props }) {
  const eStore = expensesStore();
  const aStore = authStore();
  const username = authStore().username;

  useEffect(() => {
    // fetch expenses
    aStore.checkAuth();
    eStore.fetchExpenses();
    console.log("finished fetching expenses", eStore.expenses);
  }, []);

  const [filteredYear, setFilteredYear] = useState(
    new Date().getFullYear().toString()
  );
  const [filteredMonth, setFilteredMonth] = useState(
    new Date().toLocaleString("en-us", { month: "long" })
  );
  const [filteredCategory, setFilteredCategory] = useState("All");

  const [filteredYearWithMonth, setFilteredYearWithMonth] = useState(
    new Date().getFullYear().toString()
  );

  const [mobileCategoryFilter, setMobileCategoryFilter] = useState("All");
  const [yearMode, setYearMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [expensesLoading, setExpensesLoading] = useState(false);

  const budgetDict = {
    "Food and Drink": aStore.user.foodAndDrink,
    Shopping: aStore.user.shopping,
    Entertainment: aStore.user.entertainment,
    Rent: aStore.user.rent,
    Other: aStore.user.misc,
    All:
      aStore.user.foodAndDrink +
      aStore.user.shopping +
      aStore.user.entertainment +
      aStore.user.misc +
      aStore.user.rent,
  };

  let filteredExpenses = [];
  let filteredExpensesOfCategory = [];
  let filteredExpensesOfText = [];

  if (yearMode) {
    for (let key in budgetDict) {
      budgetDict[key] = budgetDict[key] * 12;
    }
  }

  function mobileCategoryFilterChangeHandler(value) {
    setMobileCategoryFilter(value);
  }

  function searchHandler(value) {
    setSearchTerm(value);
  }

  function onSeeExpensesHandler() {}

  function addExpenseHandler(expense) {
    setFilteredCategory("All");
  }

  function yearModeHandler() {
    setYearMode(!yearMode);
    setFilteredYear(new Date().getFullYear().toString());
    setFilteredCategory("All");
    setSearchTerm("");
    setMobileCategoryFilter("All");
  }

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
    console.log("Year mode!", selectedYear.value);
    setFilteredCategory("All");
    setSearchTerm("");
  }

  function yearWithMonthChangeHandler(selectedYear) {
    setFilteredYearWithMonth(selectedYear);
    setFilteredCategory("All");
    setSearchTerm("");
  }

  function monthlyFilterChangeHandler(selectedMonth) {
    setFilteredMonth(selectedMonth);
    setFilteredCategory("All");
    // setSeeExpenses(true);
    setSearchTerm("");
  }

  function categoryChangeHandler(category) {
    if (category === filteredCategory) {
      setFilteredCategory("All");
    } else {
      console.log("changing categories to ", category);
      setFilteredCategory(category);
    }
    setSearchTerm("");
  }

  if (eStore.expenses) {
    // if in month mode
    filteredExpenses = eStore.expenses.filter(
      (expense) =>
        new Date(expense.date).getFullYear().toString() ===
          filteredYearWithMonth &&
        new Date(expense.date).toLocaleString("en-us", { month: "long" }) ===
          filteredMonth
    );

    // if in year mode
    if (yearMode) {
      filteredExpenses = eStore.expenses.filter(
        (expense) =>
          new Date(expense.date).getFullYear().toString() === filteredYear
      );
    }

    console.log("after the year filter", filteredExpenses);

    filteredExpensesOfCategory = filteredExpenses;
    // if category filter applied
    if (filteredCategory !== "All") {
      filteredExpensesOfCategory = filteredExpenses.filter((expense) => {
        return filteredCategory === expense.category;
      });
    }

    if (mobileCategoryFilter !== "All") {
      filteredExpensesOfCategory = filteredExpenses.filter((expense) => {
        return mobileCategoryFilter === expense.category;
      });
    }

    // lastly, order the filtered expenses by date
    filteredExpensesOfCategory.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });

    filteredExpensesOfText = filteredExpensesOfCategory;
    // for text search
    if (searchTerm !== "" && filteredExpensesOfText) {
      filteredExpensesOfText = filteredExpensesOfCategory.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  // get ExpenseList
  function getExpenseList(seeExpenses, expenses) {
    if (seeExpenses) {
      return <div></div>;
    } else if (!seeExpenses && expenses.length > 0) {
      return (
        <button onClick={onSeeExpensesHandler} className="expenses-button">
          See Expenses
        </button>
      );
    }
  }

  let categoryDict = {
    "Food and Drink": 0,
    Shopping: 0,
    Entertainment: 0,
    Rent: 0,
    Other: 0,
  };

  // get only active categories
  function getActiveCategory(expenses) {
    expenses.map((expense) => {
      categoryDict[expense.category] += expense.amount;
    });

    let active = [];
    for (let key in categoryDict) {
      if (categoryDict[key] > 0) {
        active.push(key);
      }
    }
    return active;
  }

  return (
    <Card className="expenses">
      <h2 className="username-text">
        Hello, <span className="bold light-purple">{aStore.user.name}</span>
      </h2>
      <NewExpense onAddExpense={addExpenseHandler} mode="add"></NewExpense>
      <Filters
        onYearlyFilterChange={filterChangeHandler}
        onMonthlyFilterChange={monthlyFilterChangeHandler}
        onYearWithMonthFilterChange={yearWithMonthChangeHandler}
        onCategoryChange={categoryChangeHandler}
        selectedYear={filteredYear}
        selectedMonth={filteredMonth}
        onModeChange={yearModeHandler}
        yearMode={yearMode}
      />
      <MobileCategoryFilter
        activeCategories={getActiveCategory(filteredExpenses)}
        onMobileCategoryFilterChange={mobileCategoryFilterChangeHandler}
        selectedMobileCategory={mobileCategoryFilter}
      />
      {!expensesLoading && (
        <>
          <CategoryFilter
            onCategoryChange={categoryChangeHandler}
            selectedCategory={filteredCategory}
            expenses={filteredExpenses}
            budgetDict={budgetDict}
            yearMode={yearMode}
          />
          <Dashboard
            expenses={filteredExpensesOfCategory}
            selectedMonth={filteredMonth}
            selectedYear={filteredYear}
            selectedCategory={filteredCategory}
            selectedMobileCategory={mobileCategoryFilter}
            selectedYearWithMonth={filteredYearWithMonth}
            maxBudget={budgetDict["All"]}
            budgetDict={budgetDict}
            yearMode={yearMode}
          />
        </>
      )}
      <Card
        className={`expense-list-card ${
          filteredExpenses.length === 0 ||
          filteredExpensesOfCategory.length == 0
            ? "justify-center"
            : ""
        }`}
      >
        {filteredExpenses.length >= 1 &&
        filteredExpensesOfCategory.length >= 1 ? (
          <ExpensesList
            items={filteredExpensesOfText}
            yearMode={yearMode}
            onSearch={searchHandler}
            searchTerm={searchTerm}
          />
        ) : (
          <h3>No Expenses Recorded</h3>
        )}
      </Card>
    </Card>
  );
}

export default Expenses;
