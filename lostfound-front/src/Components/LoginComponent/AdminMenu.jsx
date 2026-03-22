import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";

const AdminMenu = () => {
  let navigate = useNavigate();
  const [studentOpen, setStudentOpen] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(false);

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
      <div align="center" className="menu-header-strip admin-header">
        <h1 className="text-center menu-header-title">
          <u>
            <i>Lost &amp; Found Admin Menu</i>
          </u>
        </h1>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light menu-navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="basic-navbar-nav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-dark text-decoration-none p-2"
                  onClick={() => {
                    setStudentOpen(!studentOpen);
                    setItemsOpen(false);
                  }}
                >
                  <b>Student</b>
                </button>
                {studentOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <a className="dropdown-item" href="#">
                        Student List
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-dark text-decoration-none p-2"
                  onClick={() => {
                    setItemsOpen(!itemsOpen);
                    setStudentOpen(false);
                  }}
                >
                  <b>Items</b>
                </button>
                {itemsOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <a className="dropdown-item" href="/found-report">
                        Found Item List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/lost-report">
                        Lost Item List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/match-report">
                        Match Item List
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/chat">
                  <b>Chatting</b>
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-dark p-2"
                  onClick={handleLogout}
                >
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
export default AdminMenu;
