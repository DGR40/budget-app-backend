import { useState, useEffect, useContext } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import Filters from "../Filters/Filters";
import CategoryExpenseChart from "./CategoryExpenseChart";
import CategoryFilter from "../Filters/CategoryFilter";
import Dashboard from "../Dashboard/Dashboard";
import NewExpense from "../NewExpense/NewExpense";
import MobileCategoryFilter from "../Filters/MobileCategoryFilter";
import AuthContext from "../../Store/auth-context";
import { getAuthToken } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";

function Expenses(props) {
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
  const [seeExpenses, setSeeExpenses] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [expensesLoading, setExpensesLoading] = useState(false);

  useEffect(() => {
    setExpensesLoading(true);
    console.log("fetching expenses");
    const token = getAuthToken();

    console.log("Token" + token);

    const loadExpenses = async () => {
      const response = await fetch("http://localhost:3001/api/v1/expenses", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const expenses = await response.json();
        setExpenses(expenses.data);
        setExpensesLoading(false);
        console.log(expenses);
      } else {
        console.log("that didn't work!");
        navigate("/login");
      }
    };
    loadExpenses();
  }, []);

  const budgetDict = {
    "Food and Drink": 500,
    Shopping: 100,
    Entertainment: 200,
    Rent: 1000,
    Subscriptions: 100,
    Transportation: 50,
    All: 1450,
  };

  if (yearMode) {
    for (let key in budgetDict) {
      budgetDict[key] = budgetDict[key] * 12;
    }
  }

  function mobileCategoryFilterChangeHandler(value) {
    setMobileCategoryFilter(value);
    setSeeExpenses(true);
  }

  function searchHandler(value) {
    setSearchTerm(value);
  }

  function onSeeExpensesHandler() {
    setSeeExpenses((prev) => !prev);
  }

  function addExpenseHandler(expense) {
    setSeeExpenses(true);
    props.onAddExpense(expense);
    setFilteredCategory("All");
  }

  function yearModeHandler() {
    setYearMode(!yearMode);
    setFilteredYear(new Date().getFullYear().toString());
    setFilteredCategory("All");
    setSearchTerm("");
    setSeeExpenses(false);
    setMobileCategoryFilter("All");
  }

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
    console.log("Year mode!", selectedYear.value);
    setFilteredCategory("All");
    setSearchTerm("");
    setSeeExpenses(false);
  }

  function yearWithMonthChangeHandler(selectedYear) {
    setFilteredYearWithMonth(selectedYear);
    setFilteredCategory("All");
    setSearchTerm("");
    setSeeExpenses(false);
  }

  function monthlyFilterChangeHandler(selectedMonth) {
    setFilteredMonth(selectedMonth);
    setFilteredCategory("All");
    // setSeeExpenses(true);
    setSearchTerm("");
    setSeeExpenses(false);
  }

  function categoryChangeHandler(category) {
    if (category === filteredCategory) {
      setFilteredCategory("All");
    } else {
      console.log("changing categories to ", category);
      setFilteredCategory(category);
    }
    setSearchTerm("");
    setSeeExpenses(true);
  }

  // if in month mode
  let filteredExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date).getFullYear().toString() ===
        filteredYearWithMonth &&
      new Date(expense.date).toLocaleString("en-us", { month: "long" }) ==
        filteredMonth
  );

  console.log("after month filter", filteredExpenses);

  // if in year mode
  if (yearMode) {
    filteredExpenses = expenses.filter(
      (expense) =>
        new Date(expense.date).getFullYear().toString() === filteredYear
    );
  }

  let filteredExpensesOfCategory = filteredExpenses;
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

  let filteredExpensesOfText = filteredExpensesOfCategory;
  // for text search
  if (searchTerm !== "" && filteredExpensesOfText) {
    filteredExpensesOfText = filteredExpensesOfCategory.filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // get ExpenseList
  function getExpenseList(seeExpenses, expenses) {
    if (seeExpenses) {
      return (
        <div>
          <ExpensesList
            items={expenses}
            yearMode={yearMode}
            onSearch={searchHandler}
            searchTerm={searchTerm}
          />
        </div>
      );
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
    Subscriptions: 0,
    Rent: 0,
    Transportation: 0,
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
      <NewExpense onAddExpense={addExpenseHandler}></NewExpense>
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
        <Dashboard
          expenses={filteredExpensesOfCategory}
          selectedMonth={filteredMonth}
          selectedYear={filteredYear}
          selectedCategory={filteredCategory}
          selectedYearWithMonth={filteredYearWithMonth}
          maxBudget={budgetDict["All"]}
          budgetDict={budgetDict}
          yearMode={yearMode}
        />
      )}

      <CategoryFilter
        onCategoryChange={categoryChangeHandler}
        selectedCategory={filteredCategory}
      />
      <CategoryExpenseChart
        expenses={filteredExpenses}
        budgetDict={budgetDict}
        selectedCategory={filteredCategory}
      />
      <Card className="expense-list-card">
        {getExpenseList(seeExpenses, filteredExpensesOfText)}
      </Card>
    </Card>
  );
}

export default Expenses;