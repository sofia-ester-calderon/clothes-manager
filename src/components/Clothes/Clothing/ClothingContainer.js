import React, { useState, useEffect } from "react";
import ClothingForm from "./ClothingForm";
import { Types, Colors, emptyClothing } from "../../../data/data";
import { toast } from "react-toastify";
import styles from "./Clothing.module.css";
import { Redirect } from "react-router-dom";
import * as api from "../../../data/mockApi";

const ClothingContainer = (props) => {
  const [clothing, setClothing] = useState(emptyClothing);
  const [types, setTypes] = useState(clothing.category === "" ? [] : Types);
  const [colors, setColors] = useState(Colors);
  const [errors, setErrors] = useState({});
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  useEffect(() => {
    const clothingId = props.match.params.id;
    if (clothingId) {
      const clothingDisplay = api.getClothing(clothingId);
      setClothing(clothingDisplay);
      determineTypesFromCategory(clothingDisplay.category);
      setColors(
        Colors.filter((color) => !clothingDisplay.colors.includes(color.name))
      );
    }
  }, [props.match.params.id]);

  function saveClothesHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      if (clothing.id) {
        api.editClothing(clothing);
      } else {
        api.saveClothing(clothing);
      }
      setSaveSuccessful(true);
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
      removeColorFromColorSelection(value);
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

  function removeColorFromColorSelection(chosenColor) {
    setColors(colors.filter((color) => color.name !== chosenColor));
  }

  function removeColorHandler(deletedColor) {
    setClothing((prevClothing) => ({
      ...prevClothing,
      colors: prevClothing.colors.filter((color) => color !== deletedColor),
    }));

    setColors([...colors, Colors.find((c) => c.name === deletedColor)]);
  }

  function changeColorHandler(event, prevColor) {
    const newColor = event.target.value;
    setClothing((prevClothing) => ({
      ...prevClothing,
      colors: prevClothing.colors.map((color) =>
        color === prevColor ? newColor : color
      ),
    }));

    const newSelectionColors = colors.map((color) => {
      return color.name === newColor
        ? Colors.find((c) => c.name === prevColor)
        : color;
    });
    setColors(newSelectionColors);
  }

  return saveSuccessful ? (
    <Redirect to="/clothes" />
  ) : (
    <div className={styles.layout}>
      <ClothingForm
        clothing={clothing}
        onSave={saveClothesHandler}
        onChange={changeClothingHandler}
        onRemoveColor={removeColorHandler}
        onChangeColor={changeColorHandler}
        types={types}
        colors={colors}
        errors={errors}
      />
    </div>
  );
};

export default ClothingContainer;
