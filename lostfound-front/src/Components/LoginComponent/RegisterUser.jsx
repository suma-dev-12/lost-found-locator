import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "../../App.css";

const RegisterUser = () => {
  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });
  const [flag, setFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createNewUser = (event) => {
    event.preventDefault();
    if (lostFoundUser.password === confirmPassword) {
      registerNewUser(lostFoundUser)
        .then(() => {
          setFlag(true);
        })
        .catch(() => {
          setErrors((prev) => ({
            ...prev,
            submit:
              "Registration failed. Check that the backend is running and try again.",
          }));
        });
    }
  };

  useEffect(() => {
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostFoundUser((values) => ({ ...values, [name]: value }));
  };

  const returnBack = () => {
    navigate("/");
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User name is required";
      isValid = false;
    }

    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      lostFoundUser.password.length < 5 ||
      lostFoundUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (lostFoundUser.password !== confirmPassword) {
      tempErrors.password = "Both passwords do not match";
      isValid = false;
    }

    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Personal name is required";
      isValid = false;
    }
    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      createNewUser(event);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-pill">
            <span className="brand-dot" />
            LOST &amp; FOUND PORTAL
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Register once to manage your lost and found items.
          </p>
        </div>

        <form method="post" onSubmit={handleValidation} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              User name
            </label>
            <input
              id="username"
              placeholder="Choose a user name"
              name="username"
              className="form-control"
              value={lostFoundUser.username}
              onChange={onChangeHandler}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
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
              value={lostFoundUser.password}
              onChange={onChangeHandler}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="personalName">
              Full name
            </label>
            <input
              id="personalName"
              placeholder="Enter your full name"
              name="personalName"
              className="form-control"
              value={lostFoundUser.personalName}
              onChange={onChangeHandler}
            />
            {errors.personalName && (
              <div className="text-danger">{errors.personalName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              name="email"
              className="form-control"
              value={lostFoundUser.email}
              onChange={onChangeHandler}
            />
            {errors.email && (
              <div className="text-danger">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              list="types"
              name="role"
              className="form-control"
              value={lostFoundUser.role}
              onChange={onChangeHandler}
            />
            <datalist id="types">
              <option value="Student" />
              <option value="Admin" />
            </datalist>
            {errors.role && <div className="text-danger">{errors.role}</div>}
          </div>

          <button type="submit" className="btn-primary">
            Create account
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-footer-prompt">Already registered?</span>
          <button type="button" className="btn-secondary" onClick={returnBack}>
            Back to login
          </button>
        </div>

        {errors.submit && (
          <div className="text-danger" style={{ marginTop: 8 }}>
            {errors.submit}
          </div>
        )}
        {flag && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#2563eb" }}>
            New user created. You can now sign in.
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
