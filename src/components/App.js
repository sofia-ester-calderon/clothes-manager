import React from "react";
import ManageClothesPage from "./Clothes/ManageClothesPage";
import { ToastContainer } from "react-toastify";
import Header from "./Header/Header";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/clothing" component={ManageClothesPage} />
        </Switch>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
