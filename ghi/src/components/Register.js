import React, { useContext } from "react";
import { UserContext, useState } from "../context/UserContext";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [, setToken] = useContext(UserContext);

    return (
        <div className="column">
            <form className="box">
                <h1 className="title has-text-centered">Register</h1>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input type="first_name" placeholder="Enter First Name" value={first_name} onChange={ (e) =>
                        setFirstName(e.target.value)} className="input" required/>
                    </div>

                    </div>
                    <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input type="last_name" placeholder="Enter Last Name" value={last_name} onChange={ (e) =>
                        setLastName(e.target.value)} className="input" required/>
                    </div>

                    </div>
                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input type="email" placeholder="Enter Email" value={email} onChange={ (e) =>
                        setEmail(e.target.value)} className="input" required/>
                    </div>

                    </div>
                    <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input type="username" placeholder="Enter Username" value={username} onChange={ (e) =>
                        setUsername(e.target.value)} className="input" required/>
                    </div>

                    </div>
                    <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password" placeholder="Enter Password" value={password} onChange={ (e) =>
                        setPassword(e.target.value)} className="input" required/>
                    </div>

                    </div>

            </form>

        </div>
    )

};
