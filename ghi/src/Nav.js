import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Logo from "../src/media/moviemixer.png";

function Nav() {
  const user = useContext(UserContext);
  const userToken = user[0];

  const LoggedOutNavOptions = (
    <>
      <li className="nav-item px-2">
        <NavLink className="nav-link active" to="/login">
          Log In
        </NavLink>
      </li>
      <li className="nav-item px-2">
        <NavLink className="nav-link active" to="/register">
          Register
        </NavLink>
      </li>
    </>
  );



  const LoggedInNavOptions = (
    <>
      <li className="nav-item px-2">
        <NavLink className="nav-link active" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item px-2 dropdown">
        <NavLink
          to="/"
          className="nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Menu
        </NavLink>
        <ul className="dropdown-menu p-1">
          <li>
            <NavLink className="dropdown-item p-0" to="/"></NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/my-groups">
              My Movie Lists
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="groups/">
              Community Movie Lists
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/trivia">
              Movie Trivia
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item px-2">
        <NavLink className="nav-link active" to="/logout">
          Log Out
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-brand">
      <div className="container-fluid">
        <NavLink className="navbar-brand px-2" to="/">
          <img src={Logo} alt="Logo" width={200} height={42} />
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            {userToken !== "null" ? LoggedInNavOptions : LoggedOutNavOptions}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
