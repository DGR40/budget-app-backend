import useInput from "../Hooks/use-input";
import { useState, useContext } from "react";
import { redirect, Link } from "react-router-dom";
import "./LoginForm.css";
import Card from "./UI/Card.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import { getAuthToken } from "../Utils/auth";
import Cookies from "js-cookie";

const isNotEmptyIsLong = (value) => value.trim() !== "" && value.length >= 6;
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

function SignUpForm() {
  const navigate = useNavigate();
  const goToExpenses = () => navigate("/expenses");

  console.log("hey there!!!!!!!!!!!");

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

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log("test");

    setIsLoading(true);
    setSignupFailed(false);
    let url = "http://localhost:3001/api/v1/auth/register";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    if (!response.ok) {
      let errorMessage = "Authentication failed!";
      setSignupFailed(true);
      resetEmail();
    } else {
      const data = await response.json();
      console.log("DATA", data);
      const token = data.token;
      localStorage.setItem("token", token);
      Cookies.set("token", token);
      console.log("checking token after login", getAuthToken());

      resetEmail();
      resetPassword();
      resetName();
      console.log("Submitted!");
      console.log(passwordValue, emailValue);
      goToExpenses();
    }
  };

  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const nameClasses = nameHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler} class="expenses login">
      <div className="login-title">Sign Up Today!</div>
      <div className="login-group">
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <input
            placeholder="Ex: John Doe"
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
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
            value={emailValue}
            onChange={emailChangeHandler}
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
            placeholder="at least six characters long"
            value={passwordValue}
            onChange={passwordChangeHandler}
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

          <Link to="/login" class="signup-text">
            Already have an account? Sign in...
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
