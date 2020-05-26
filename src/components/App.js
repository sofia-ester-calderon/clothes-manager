import React from "react";
import ManageClothesPage from "./Clothes/ManageClothesPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ManageClothesPage />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
