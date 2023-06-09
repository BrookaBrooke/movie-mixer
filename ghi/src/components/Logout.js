import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const [token] = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };

      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        localStorage.setItem("leadsToken", "null");
        localStorage.setItem("user_id", "null");
        localStorage.setItem("username", "null");
        navigate("/movie-mixer");
        window.location.reload(false);
      }
    };
    logout();
  }, [navigate, token]);

  return (
    <div className="banner-search row">
      <div className="bg-dark text-light offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 id="">Log out page</h1>
        </div>
      </div>
    </div>
  );
};

export default Logout;
