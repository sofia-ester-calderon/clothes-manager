import React, { useState, useEffect, useContext } from "react";
import ClothingForm from "./ClothingForm";
import { Types, Colors, emptyClothing } from "../../../data/data";
import { toast } from "react-toastify";
import styles from "./Clothing.module.css";
import { Redirect } from "react-router-dom";
import * as api from "../../../api/clothesApi";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

const ClothingContainer = (props) => {
  const [clothing, setClothing] = useState(emptyClothing);
  const [types, setTypes] = useState(clothing.category === "" ? [] : Types);
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({});
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [saving, setSaving] = useState(false);

  const allColors = useContext(AllColorsContext);

  useEffect(() => {
    async function getClothingFromApi(id) {
      const clothingDisplay = await api.getClothing(id);
      setClothing(clothingDisplay);
      determineTypesFromCategory(clothingDisplay.category);
    }
    const clothingId = props.match.params.id;
    if (clothingId) {
      getClothingFromApi(clothingId);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (allColors.length > 0 && clothing.id) {
      console.log("set all colors of clothing", clothing);
      setColors(
        allColors.filter((color) => !clothing.colors.includes(color.id))
      );
    }
    if (!clothing.id && clothing.colors.length === 0) {
      setColors(allColors);
    }
  }, [allColors, clothing]);

  function saveClothesHandler(event) {
    event.preventDefault();

    if (isFormValid()) {
      setSaving(true);
      if (clothing.id) {
        api
          .editClothing(clothing)
          .then(() => savingSuccessful())
          .catch(() => savingUnsucessful());
      } else {
        api
          .saveClothing(clothing)
          .then(() => savingSuccessful())
          .catch(() => savingUnsucessful());
      }
    }
  }

  function savingSuccessful() {
    setSaveSuccessful(true);
    toast.success("Clothing saved!");
  }

  function savingUnsucessful() {
    setSaving(false);
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
    setColors(colors.filter((color) => color.id !== chosenColor));
  }

  function removeColorHandler(deletedColor) {
    setClothing((prevClothing) => ({
      ...prevClothing,
      colors: prevClothing.colors.filter((color) => color !== deletedColor),
    }));

    setColors([...colors, Colors.find((c) => c.id === deletedColor)]);
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
      return color.id === newColor
        ? allColors.find((c) => c.id === prevColor)
        : color;
    });
    setColors(newSelectionColors);
  }

  return saveSuccessful ? (
    <Redirect to="/clothes" />
  ) : (
    <div className={styles.layout}>
      <AllColorsContext.Consumer>
        {() => {
          return allColors.length > 0 ? (
            <ClothingForm
              clothing={clothing}
              onSave={saveClothesHandler}
              onChange={changeClothingHandler}
              onRemoveColor={removeColorHandler}
              onChangeColor={changeColorHandler}
              types={types}
              colors={colors}
              errors={errors}
              saving={saving}
            />
          ) : null;
        }}
      </AllColorsContext.Consumer>
    </div>
  );
};

export default ClothingContainer;
