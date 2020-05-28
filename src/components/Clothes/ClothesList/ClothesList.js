import React, { useState } from "react";
import { clothesData } from "../../../data/data";

const ClothesList = () => {
  const [clothes, setClothes] = useState({ clothesData });
  console.log(clothes);
  return <h1>Clothes List</h1>;
};

export default ClothesList;
