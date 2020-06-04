import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios-clothes";

export const ApiErrorContext = React.createContext("");

function ApiErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axiosInstance.interceptors.request.use((req) => {
      setErrorMessage(null);
      return req;
    });
    axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        setErrorMessage(error.message);
        // throw error;
      }
    );
  }, []);

  return (
    <ApiErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ApiErrorContext.Provider>
  );
}

export default ApiErrorProvider;
