import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [, setToken] = useContext(UserContext);
  const navigate = useNavigate();

  async function login(username, password) {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    console.log(form);
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
          navigate("/");
          window.location.reload(false);
          // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT localStorage.getItem("user_id")
          // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
        }
      } catch (e) {}
      return false;
    }
    let error = await response.json();
    // DO SOMETHING WITH THE ERROR, IF YOU WANT
  }

  // FIRST TRY BELOW THIS LINE --

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({ username: username, password: password }),
    };

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submitLogin();
    login(username, password);
    // BLANK THE FORM _OR_ TAKE TO HOME PAGE

    setUsername("");
    setPassword("");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
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
            <button className="btn btn-primary me-5" type="submit">
              Login
            </button>
            <button className="btn btn-success me-5" type="submit">
              <NavLink className="nav-link active" to="/register">
                Register
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
