import { React, useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function Nav() {
  const user = useContext(UserContext);
  console.log(user);
  const userToken = localStorage.getItem("leadsToken");
  console.log(typeof userToken);

  const LoggedOutNavOptions = (
    <li className="nav-item px-2">
      <NavLink className="nav-link active" to="/login">
        Log In
      </NavLink>
    </li>
  );

  const LoggedInNavOptions = (
    <>
      <li className="nav-item px-2">
        <NavLink className="nav-link active" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item px-2 dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <ul className="dropdown-menu">
          <li>
            <NavLink className="dropdown-item" to="/"></NavLink>
          </li>
          {/* <li><hr className="dropdown-divider"/></li> */}
          <li>
            <NavLink className="dropdown-item" to="/my-groups">
              My Favorites
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="groups/">
              All Favorites
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/trivia">
              Movie Trivia (home)
            </NavLink>
          </li>
        </ul>
      </li>
      {/* <li className="nav-item px-2">
              <NavLink className="nav-link active" to="/register">
                Register
              </NavLink>
            </li> */}
      <li className="nav-item px-2">
        <NavLink className="nav-link active" to="/logout">
          Log Out
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand px-2" to="/">
          MovieMixer
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken !== "null" ? LoggedInNavOptions : LoggedOutNavOptions}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
