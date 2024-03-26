import { useState, useEffect } from "react";

import Expenses from "../Components/Expenses/Expenses";
import Header from "../Components/UI/Header";
import { getAuthToken } from "../Utils/auth";
import { useNavigate } from "react-router-dom";

function ExpensesPage() {
  return (
    <div className="app-container">
      <Header></Header>
      <Expenses></Expenses>
    </div>
  );
}

export default ExpensesPage;
