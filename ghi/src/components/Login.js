import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
          localStorage.setItem("leadsToken", data.access_token);
          localStorage.setItem("user_id", data.account.id);
          localStorage.setItem("username", data.account.username);
          let expiryTime = new Date(now.getTime() + 2000000);
          localStorage.setItem("loginExp", expiryTime);
          navigate("/");
          window.location.reload(false);
        }
      } catch (e) {
        setErrorMessage("There was an issue logging into your account");
      }
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-background">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="login-box">
            <div className="shadow p-4 mt-4">
              <h1 className="login-text">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <div className="control">
                    <label
                      id="username"
                      htmlFor="username"
                      className="form-label"
                    >
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
                    <label
                      id="password"
                      htmlFor="password"
                      className="form-label"
                    >
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
                <div className="button-glow2">
                  <button className="button-glow" type="submit">
                    <div className="button-glow">Login</div>
                  </button>
                </div>
                <div className="button-glow1">
                  <button className="button-glow" type="submit">
                    <NavLink className="nav-link active" to="/register">
                      Register
                    </NavLink>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
