import useInput from "../Hooks/use-input";
import { useState, useContext, useEffect } from "react";
import { useHistory, useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";
import { getAuthToken } from "../Utils/auth";
import Cookies from "js-cookie";
import authStore from "../Store/authStore";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

function LoginForm() {
  const token = getAuthToken();
  const navigate = useNavigate();

  const store = authStore();

  const [isLoading, setIsLoading] = useState(false);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await store.login();
    navigate("/expenses");
  };

  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler} className="expenses login">
      <div className="login-title">Welcome back!</div>
      <div className="login-group">
        <div className={emailClasses}>
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={emailValue}
            onChange={(e) => {
              emailChangeHandler(e);
              store.updateLoginForm(e);
            }}
            onBlur={emailBlurHandler}
          />
        </div>
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
        <div className={passwordClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={passwordValue}
            onChange={(e) => {
              passwordChangeHandler(e);
              store.updateLoginForm(e);
            }}
            onBlur={passwordBlurHandler}
          />
        </div>
        {passwordHasError && (
          <p className="error-text">Please enter a password</p>
        )}
        <div className="form-actions">
          <button
            disabled={!formIsValid}
            className={!formIsValid ? "invalid new-expense" : "new-expense"}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          <Link to="/signup" className="signup-text">
            Don't have an account... sign up!
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
