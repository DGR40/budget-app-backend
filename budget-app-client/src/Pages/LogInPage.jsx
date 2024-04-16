import { useNavigate, Navigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import Header from "../Components/UI/Header";
import authStore from "../Store/authStore";
import { useEffect } from "react";

function LogInPage() {
  const store = authStore();

  useEffect(() => {
    store.checkAuth();
  }, []);

  if (store.loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app-container">
      <Header></Header>
      <LoginForm />;
    </div>
  );
}

export default LogInPage;
