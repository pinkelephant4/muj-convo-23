import React from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const Authcontext = createContext();
export function Authprov({ children }) {
  const { clienttoken, loginstatus, loginRole } = JSON.parse(
    localStorage.getItem("login")
  ) || {
    clienttoken: null,
    loginstatus: false,
    loginRole: null,
  };

  const [token, setToken] = useState(clienttoken);
  const [isuserloggedin, setIsuserloggedin] = useState(loginstatus);
  const [role, setRole] = useState(loginRole);
  return (
    <Authcontext.Provider
      value={{
        token,
        setToken,
        isuserloggedin,
        setIsuserloggedin,
        role,
        setRole,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
export const useAuth = () => useContext(Authcontext);
