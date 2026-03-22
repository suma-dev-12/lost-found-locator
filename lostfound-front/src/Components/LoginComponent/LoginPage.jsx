import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "../../App.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [flag, setFlag] = useState(true);

  const validateLogin = (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, server: "" }));
    validateUser(loginData.username, loginData.password)
      .then((response) => {
        const role = String(response.data);
        if (role === "Admin") navigate("/admin-menu");
        else if (role === "Student") navigate("/student-menu");
        else setFlag(false);
      })
      .catch((err) => {
        setFlag(false);
        if (!err.response)
          setErrors((prev) => ({
            ...prev,
            server: "Cannot reach server. Is the backend running on port 9595?",
          }));
      });
  };

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(true);
    setErrors((prev) => ({ ...prev, server: "" }));
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    const tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User name is required.";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      validateLogin(event);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-pill">
            <span className="brand-dot" />
            LOST &amp; FOUND PORTAL
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to access your lost &amp; found dashboard.</p>
        </div>

        <form onSubmit={handleValidation} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              User name
            </label>
            <input
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your user name"
              value={loginData.username}
              onChange={onChangeHandler}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={onChangeHandler}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {errors.server && <div className="text-danger">{errors.server}</div>}
          {!flag && !errors.server && (
            <div className="text-danger">Invalid user name or password.</div>
          )}

          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-footer-prompt">New to the portal?</span>
          <button type="button" className="btn-secondary" onClick={goToRegister}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
