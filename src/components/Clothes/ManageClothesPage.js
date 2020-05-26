import React, { useState } from "react";
import ClothesForm from "./ClothesForm";
import { Types, Colors, emptyClothing } from "../data/data";

const ManageClothesPage = () => {
  const [clothing, setClothing] = useState(emptyClothing);
  const [types, setTypes] = useState(clothing.category === "" ? [] : Types);
  const [colors, setColors] = useState(
    clothing.colors.length === 0
      ? Colors
      : Colors.filter((color) => !clothing.colors.includes(color))
  );

  function saveClothesHandler(event) {
    event.preventDefault();
    console.log("saving clothing", clothing);
  }

  function changeClothingHandler(event) {
    if (typeof event === "number") {
      setClothing((prevClothing) => ({
        ...prevClothing,
        rating: event,
      }));
      return;
    }
    const { name, value } = event.target;
    if (name === "category") {
      determineTypesFromCategory(value);
    }
    if (name === "colors") {
      determineColorsFromChosenColor(value);
    }
    setClothing((prevClothing) => ({
      ...prevClothing,
      [name]: name === "colors" ? [...prevClothing.colors, value] : value,
    }));
  }

  function determineTypesFromCategory(category) {
    let typesByCategory = [];
    if (category && category !== "") {
      typesByCategory = Types.filter((type) => type.category === category);
    }
    setTypes(typesByCategory);
  }

  function determineColorsFromChosenColor(chosenColor) {
    setColors(colors.filter((color) => color !== chosenColor));
  }

  return (
    <>
      <ClothesForm
        clothing={clothing}
        onSave={saveClothesHandler}
        onChange={changeClothingHandler}
        types={types}
        colors={colors}
      />
    </>
  );
};

export default ManageClothesPage;
