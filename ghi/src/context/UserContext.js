import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("leadsToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      try {
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data === null) {
            setToken("null");
          } else {
            setToken(data.access_token);
          }
        }
      } catch (e) {}
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
