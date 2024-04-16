import SignUpForm from "../Components/SignUpForm";
import Header from "../Components/UI/Header";
import { useEffect } from "react";
import authStore from "../Store/authStore";
import { Navigate } from "react-router-dom";

function SignUpPage() {
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
      <SignUpForm />;
    </div>
  );
}

export default SignUpPage;
