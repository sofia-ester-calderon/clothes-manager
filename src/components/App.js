import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./header/Header";
import styles from "./App.module.css";
import ApiErrorProvider from "../hooks/ApiErrorProvider";
import RoutingComponent from "./routing/RoutingComponent";

function App() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <ApiErrorProvider>
          <RoutingComponent />
        </ApiErrorProvider>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
