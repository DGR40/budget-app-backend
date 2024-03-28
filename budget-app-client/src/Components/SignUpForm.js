import useInput from "../Hooks/use-input";
import { useState, useContext } from "react";
import { redirect, Link } from "react-router-dom";
import "./LoginForm.css";
import Card from "./UI/Card.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import { getAuthToken } from "../Utils/auth";
import Cookies from "js-cookie";
import authStore from "../Store/authStore.js";

const isNotEmptyIsLong = (value) => value.trim() !== "" && value.length >= 6;
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

function SignUpForm() {
  const store = authStore();

  const navigate = useNavigate();
  const goToExpenses = () => navigate("/expenses");

  const [signupFailed, setSignupFailed] = useState(false);
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
  } = useInput(isNotEmptyIsLong);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    await store.signup(e);
    goToExpenses();
  };

  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const nameClasses = nameHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler} className="expenses login">
      <div className="login-title">Sign Up Today!</div>
      <div className="login-group">
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <input
            placeholder="Ex: John Doe"
            type="text"
            id="name"
            name="name"
            value={nameValue}
            onChange={(e) => {
              nameChangeHandler(e);
              store.updateSignupForm(e);
            }}
            onBlur={nameBlurHandler}
          />
        </div>
        {nameHasError && <p className="error-text">Please enter your name</p>}
        <div className={emailClasses}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Ex: john@email.com"
            type="text"
            id="email"
            name="email"
            value={emailValue}
            onChange={(e) => {
              emailChangeHandler(e);
              store.updateSignupForm(e);
            }}
            onBlur={emailBlurHandler}
          />
        </div>
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
        {signupFailed && (
          <p className="error-text">
            That name is already taken, please change
          </p>
        )}
        <div className={passwordClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="at least six characters long"
            value={passwordValue}
            onChange={(e) => {
              passwordChangeHandler(e);
              store.updateSignupForm(e);
            }}
            onBlur={passwordBlurHandler}
          />
        </div>
        {passwordHasError && (
          <p className="error-text">
            Please enter a password longer than 5 characters
          </p>
        )}
        <div className="form-actions">
          <button
            disabled={!formIsValid}
            className={!formIsValid ? "invalid new-expense" : "new-expense"}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <Link to="/login" className="signup-text">
            Already have an account? Sign in...
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
