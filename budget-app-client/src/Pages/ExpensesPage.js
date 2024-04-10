import Expenses from "../Components/Expenses/Expenses";
import Header from "../Components/UI/Header";
import RequireAuth from "../Components/RequireAuth";

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
