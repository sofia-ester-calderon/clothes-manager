import React from "react";
import axios from "axios";
import { useState } from "react";

export const ApiErrorContext = React.createContext("something");

function ApiErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  axios.interceptors.request.use((req) => {
    console.log("got req");
    setErrorMessage(null);
    return req;
  });
  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("got resp error", error.message);
      setErrorMessage(error.message);
      throw error;
    }
  );

  return (
    <ApiErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ApiErrorContext.Provider>
  );
}

export default ApiErrorProvider;
