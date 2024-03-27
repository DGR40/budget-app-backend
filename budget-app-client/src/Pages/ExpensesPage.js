import { useState, useEffect } from "react";

import Expenses from "../Components/Expenses/Expenses";
import Header from "../Components/UI/Header";
import RequireAuth from "../Components/RequireAuth";
import { getAuthToken } from "../Utils/auth";
import { useNavigate } from "react-router-dom";
import authStore from "../Store/authStore";

function ExpensesPage() {
  return (
    <div className="app-container">
      <RequireAuth>
        <Header></Header>
        <Expenses></Expenses>
      </RequireAuth>
    </div>
  );
}

export default ExpensesPage;
