import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();
export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("leadsToken"));

    useEffect(() => {
        const fetchUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
        },
        };

        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/accounts/{username}`
        const response = await fetch(url);
        if (!response.ok) {
            setToken(null);
        }
        localStorage.setItem("leadsToken", token);
    };
    fetchUser();
    }, [token]);

    return (
      <UserContext.Provider value={[token, setToken]}>
          {props.children}
      </UserContext.Provider>
    );
};
