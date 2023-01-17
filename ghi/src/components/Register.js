import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitRegistration = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password, email: email, first_name: first_name, last_name: last_name }),
      };

      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/accounts/`
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
        if (password === confirmationPassword && password.length >= 8) {
          submitRegistration();
          // BLANK THE FORM _OR_ TAKE TO HOME PAGE
          setUsername("");  
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setConfirmationPassword("");
        } else {
          setErrorMessage("Please make sure that your password is a minimum of 8 characters");
        }

      };

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1 id="">Register Account</h1>
          <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
              <div className="control">
              <label id="username" htmlFor="username" className="form-label">Username</label>
                <input type="username" placeholder="Enter Username" value={username} onChange={ (e) =>
                setUsername(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <div className="form-floating mb-3">
              <div className="control">
                <label id="password" htmlFor="password" className="form-label">Enter Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={ (e) =>
                setPassword(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <div className="form-floating mb-3">
              <div className="control">
                <label id="password" htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" placeholder="Password Must Match" value={confirmationPassword} onChange={ (e) =>
                setConfirmationPassword(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <div className="mb-3">
              <div className="control">
                <label id="email" htmlFor="email" className="form-label">Email address</label>
                <input type="email" placeholder="Enter Email" value={email} onChange={ (e) =>
                setEmail(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <div className="mb-3">
              <div className="control">
                <label id="first_name" htmlFor="first_name" className="form-label">First Name</label>
                <input type="first_name" placeholder="Enter First Name" value={first_name} onChange={ (e) =>
                setFirstName(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <div className="mb-3">
              <div className="control">
                <label id="last_name" htmlFor="last_name" className="form-label">Last Name</label>
                <input type="last_name" placeholder="Enter Last Name" value={last_name} onChange={ (e) =>
                setLastName(e.target.value)} className="form-control" required/>
              </div>
            </div>
            <ErrorMessage message={errorMessage}/>
            <br />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
    );

};

export default Register;
