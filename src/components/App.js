import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import styles from "./App.module.css";
import RoutingComponent from "./routing/RoutingComponent";
import Header from "./header/Header";
import authActions from "../store/actions/authActions";
import { connect } from "react-redux";

function App({ autoLogin, ...props }) {
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <RoutingComponent />
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(authActions.autoLogin()),
  };
};

export default connect(null, mapDispatchToProps)(App);
