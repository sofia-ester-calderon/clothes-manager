import React, { useState } from "react";
import ClothesForm from "./ClothesForm";
import { Types, Colors, emptyClothing, clothes } from "../../data/data";
import { toast } from "react-toastify";
import styles from "./Clothing.module.css";

const ManageClothesPage = () => {
  const [clothing, setClothing] = useState(emptyClothing);
  const [types, setTypes] = useState(clothing.category === "" ? [] : Types);
  const [colors, setColors] = useState(
    clothing.colors.length === 0
      ? Colors
      : Colors.filter((color) => !clothing.colors.includes(color))
  );
  const [errors, setErrors] = useState({});

  function saveClothesHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      clothes.push(clothing);
      toast.success("Clothing saved!");
    }
  }

  function isFormValid() {
    const { category, type, colors, occasion } = clothing;
    const errors = {};
    if (!category || category === "") errors.category = "Category is required";
    if (!type || type === "") errors.type = "Type is required";
    if (colors.length < 1) errors.colors = "Min. one color is required";
    if (!occasion || occasion === "") errors.occasion = "Occasion is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  }

  function determineTypesFromCategory(category) {
    let typesByCategory = [];
    if (category && category !== "") {
      typesByCategory = Types.filter((type) => type.category === category);
    }
    setTypes(typesByCategory);
  }

  function determineColorsFromChosenColor(chosenColor) {
    setColors(colors.filter((color) => color.name !== chosenColor));
  }

  return (
    <div className={styles.layout}>
      <ClothesForm
        clothing={clothing}
        onSave={saveClothesHandler}
        onChange={changeClothingHandler}
        types={types}
        colors={colors}
        errors={errors}
      />
    </div>
  );
};

export default ManageClothesPage;
