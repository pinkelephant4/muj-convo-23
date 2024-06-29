import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "react-bootstrap";
import { useAlert } from "../context/AlertMessageContext";
const Alerts = ({ variant }) => {
  const { message, setMessage } = useAlert();
  return (
    <div className=''>
      <Alert
        variant={variant}
        style={{
          position: "fixed",
          top: "90px",
          width: "auto",
          left: "30%",
          zIndex: "1000000",
          marginTop: "0rem",
        }}
      >
        {message}{" "}
      </Alert>
    </div>
  );
};

export default Alerts;
