import React from "react";
import { ToastContainer } from "react-toastify";
import styles from "./App.module.css";
import ApiErrorProvider from "../hooks/ApiErrorProvider";
import AllColorsProvider from "../hooks/AllColorsProvider";
import RoutingComponent from "./routing/RoutingComponent";
import Header from "./header/Header";

function App() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <ApiErrorProvider>
          <AllColorsProvider>
            <RoutingComponent />
          </AllColorsProvider>
        </ApiErrorProvider>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
