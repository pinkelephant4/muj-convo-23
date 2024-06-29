import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Authprov } from "./context/AuthContext";
import { LoadingProv } from "./context/SideContext";
import { AlertMessageProv } from "./context/AlertMessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertMessageProv>
      <LoadingProv>
        <Authprov>
          <App />
        </Authprov>
      </LoadingProv>
    </AlertMessageProv>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
