import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("leadsToken"));

  useEffect(() => {
    const logout = async () => {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const response = await fetch(url);
      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("leadsToken", "null");
      navigate("/");
      window.location.reload(false);
    };
    logout();
  }, [token]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 id="">Log out page</h1>
        </div>
      </div>
    </div>
  );
};

export default Logout;
