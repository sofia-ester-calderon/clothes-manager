import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios-api";

export const ApiErrorContext = React.createContext();

function ApiErrorProvider({ children }) {
  const [reqInterceptor, setReqInterceptor] = useState(-1);
  const [respInterceptor, setRespInterceptor] = useState(-1);
  const [apiStatus, setApiStatus] = useState({
    errorMessage: null,
    loading: false,
    apiCallMethod: null,
    errorType: null,
  });

  if (reqInterceptor < 0) {
    const interceptor = axiosInstance.interceptors.request.use((req) => {
      if (
        req.method === "get" ||
        req.method === "put" ||
        req.method === "post"
      ) {
        setApiStatus({ loading: true, errorMessage: null });
      }
      return req;
    });
    setReqInterceptor(interceptor);
  }

  if (respInterceptor < 0) {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => {
        setApiStatus({
          loading: false,
          errorMessage: null,
          apiCallMethod: res.config.method,
        });
        return res;
      },
      (error) => {
        let errorMessage = error.response.statusText;
        let errorType = ERROR_TYPE_GENERIC;

        if (error.response.data.error) {
          errorMessage = error.response.data.error.message;
          errorType = ERROR_TYPE_SESSION;
          if (error.response.config.url.includes("accounts:signUp")) {
            errorType = ERROR_TYPE_SIGN_UP;
          }
          if (error.response.config.url.includes("accounts:signIn")) {
            errorType = ERROR_TYPE_LOGIN;
          }
        }
        setApiStatus({ loading: false, errorMessage, errorType });
      }
    );
    setRespInterceptor(interceptor);
  }

  useEffect(() => {
    axiosInstance.interceptors.request.eject(reqInterceptor - 1);
  }, [reqInterceptor]);

  useEffect(() => {
    axiosInstance.interceptors.response.eject(respInterceptor - 1);
  }, [respInterceptor]);

  return (
    <ApiErrorContext.Provider value={{ apiStatus, setApiStatus }}>
      {children}
    </ApiErrorContext.Provider>
  );
}

export default ApiErrorProvider;

export const ERROR_TYPE_GENERIC = "GENERIC";
export const ERROR_TYPE_SESSION = "SESSION";
export const ERROR_TYPE_SIGN_UP = "SIGN_UP";
export const ERROR_TYPE_LOGIN = "LOGIN";
