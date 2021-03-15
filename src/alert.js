import React, { useEffect } from "react";

const Alert = ({ type, message, removeAlert, list }) => {
  useEffect(() => {
    let timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [removeAlert]);
  return <p className={`alet-component alert-${type}`}>{message}</p>;
};

export default Alert;
