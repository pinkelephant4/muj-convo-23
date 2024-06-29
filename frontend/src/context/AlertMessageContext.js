import React from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const AlertMessagecontext = createContext();
export function AlertMessageProv({ children }) {
  const [message, setMessage] = useState("");
  return (
    <AlertMessagecontext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </AlertMessagecontext.Provider>
  );
}
export const useAlert = () => useContext(AlertMessagecontext);
