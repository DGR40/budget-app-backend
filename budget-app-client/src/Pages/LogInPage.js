import { json, redirect } from "react-router-dom";
import LoginForm from "../Components/LoginForm.js";
import Header from "../Components/UI/Header.js";

function LogInPage() {
  return (
    <div className="app-container">
      <Header></Header>
      <LoginForm />;
    </div>
  );
}

export default LogInPage;
