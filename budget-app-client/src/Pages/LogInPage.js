import { useNavigate, Navigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm.js";
import Header from "../Components/UI/Header.js";
import authStore from "../Store/authStore.js";

function LogInPage() {
  const store = authStore();

  if (store.loggedIn) {
    return <Navigate to="/expenses" />;
  }

  return (
    <div className="app-container">
      <Header></Header>
      <LoginForm />;
    </div>
  );
}

export default LogInPage;
