import useInput from "../Hooks/use-input";
import { useState, useContext, useEffect } from "react";
import { useHistory, useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";
import { getAuthToken } from "../Utils/auth";
import Cookies from "js-cookie";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

function LoginForm() {
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log("Token found");
      navigate("/expenses");
    }
  }, [token, navigate]);

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

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("test");

    setIsLoading(true);
    let url = "http://localhost:3001/api/v1/auth/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        Cookies.set("token", token);
        resetEmail();
        resetPassword();
        navigate("/expenses");
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log("Submitted!");
    console.log(passwordValue, emailValue);
  };

  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler} class="expenses login">
      <div className="login-title">Welcome back!</div>
      <div className="login-group">
        <div className={emailClasses}>
          <label htmlFor="name">Email</label>
          <input
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
        <div className={passwordClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
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
          <Link to="/signup" class="signup-text">
            Don't have an account... sign up!
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
