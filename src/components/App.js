import React from "react";
import ManageClothingPage from "./Clothes/Clothing/ManageClothingPage";
import { ToastContainer } from "react-toastify";
import Header from "./Header/Header";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import ClothesList from "./Clothes/ClothesList/ClothesList";

function App() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/clothing" component={ManageClothingPage} />
          <Route path="/clothes" component={ClothesList} />
        </Switch>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
