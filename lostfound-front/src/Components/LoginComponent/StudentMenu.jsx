import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";

const StudentMenu = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className=".container menu-page">
      <br />
      <div align="center" className="menu-header-strip student-header">
        <h1 className="text-center menu-header-title">
          <u>
            <i>Lost &amp; Found Student Menu</i>
          </u>
        </h1>
      </div>

      {/* Simple Bootstrap navbar without react-bootstrap */}
      <nav className="navbar navbar-expand-lg menu-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#student-navbar"
            aria-controls="student-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="student-navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>Personal</b>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Personal Details
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>Lost Item</b>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/lost-entry">
                      Lost Item Form Submission
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/lost-report">
                      Lost Item List
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>Found Item</b>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/found-entry">
                      Found Item Form Submission
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/found-report">
                      Found Item List
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/chat">
                  <b>Chatting</b>
                </a>
              </li>

              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  <b>Logout</b>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default StudentMenu;