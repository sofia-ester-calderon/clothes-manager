import React from "react";
import ClothingContainer from "./Clothes/Clothing/ClothingContainer";
import { ToastContainer } from "react-toastify";
import Header from "./Header/Header";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import AllClothesContainer from "./Clothes/ClothesList/AllClothesContainer";

function App() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/clothing" component={ClothingContainer} />
          <Route path="/clothes" component={AllClothesContainer} />
        </Switch>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
