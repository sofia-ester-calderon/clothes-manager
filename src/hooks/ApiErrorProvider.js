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
    authError: false,
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
        let authError = false;
        if (error.response.data.error) {
          errorMessage = error.response.data.error.message;
          authError = true;
        }
        setApiStatus({ loading: false, errorMessage, authError });
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
