import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, renderMatches } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

let now = new Date();

const Login = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function login(username, password) {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const tokenUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;

      try {
        const response = await fetch(tokenUrl, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;
          localStorage.setItem("leadsToken", data.access_token);
          localStorage.setItem("user_id", data.account.id);
          localStorage.setItem("username", data.account.username);
          let expiryTime = new Date(now.getTime() + 2000000 );
          localStorage.setItem("loginExp", expiryTime);
          navigate("/");
          window.location.reload(false);
        }
      } catch (e) {}
      return false;
    }
    let error = await response.json();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="banner-search row">
      <div className="offset-3 col-6">
        <div className="bg-dark text-light shadow p-4 mt-4">
          <h1 id="">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <div className="control">
                <label id="username" htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="form-floating mb-3">
              <div className="control">
                <label id="password" htmlFor="password" className="form-label">
                  Enter Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <ErrorMessage message={errorMessage} />
            <br />
            <div>
              <button className="btn btn-primary me-5" type="submit">
                Login
              </button>
              <div className="d-inline me-3">Don't have an account?</div>
              <button className="btn btn-success me-5" type="submit">
                <NavLink className="nav-link active" to="/register">
                  Register
                </NavLink>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
