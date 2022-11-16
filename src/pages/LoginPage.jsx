import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useEmailValidation,
  usePasswordValidation,
} from "../hooks/emailAndPassword";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(false);
  const [emailFieldTouched, setEmailFieldTouched] = useState(false);
  const [passwordFieldTouched, setPasswordFieldTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isEmailValid = useEmailValidation(email);
  const isPasswordValid = usePasswordValidation(password);
  const isFormValid = isEmailValid && isPasswordValid;

  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (loggedInUser) {
      navigate("/todo");
    }
  }, [loggedInUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: `email=${email}&password=${password}`,
    };
    fetch(
      "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.user_token) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/todo");
          setSubmitting(false);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        setServerError(true);
        setSubmitting(false);
      });
  };

  return (
    <section className="login__container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input__container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoFocus
            className="input__styles"
            placeholder="user@rapptrlabs.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailFieldTouched(true)}
          />
          <BsFillPersonFill className="input__icon" />
        </div>
        {!isEmailValid && emailFieldTouched && (
          <p className="error__validation">Not a valid email!</p>
        )}

        <div className="input__container">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input__styles"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={4}
            maxLength={16}
            autoComplete="true"
            onBlur={() => setPasswordFieldTouched(true)}
          />

          <FaLock className="input__icon" />
          {showPassword ? (
            <AiFillEyeInvisible
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="password__eye__icon"
            />
          ) : (
            <AiFillEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="password__eye__icon"
            />
          )}
        </div>
        {!isPasswordValid && passwordFieldTouched && (
          <p className="error__validation">
            Password must be between 4 and 16 characters!
          </p>
        )}

        <button
          type="submit"
          className={`login__btn ${!isFormValid && "disabled__gray"}`}
          disabled={!isFormValid && !submitting}
        >
          login
        </button>

        <p className="error__validation">
          {serverError &&
            "The server could not be reached. Please try again later."}
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
