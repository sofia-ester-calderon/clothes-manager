import React from "react";
import ClothesList from "./ClothesList";

const ClothesPage = () => {
  return (
    <>
      <h2>Clothes List</h2>
      <ClothesList name="Sweater" color="red" />
      <ClothesList name="Jeans" color="blue" />
    </>
  );
};

export default ClothesPage;
