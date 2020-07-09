import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import clothesApi from "../../../api/clothesApi";
import styles from "./Clothing.module.css";
import { Types, emptyClothing } from "../../../data/data";

import ClothingForm from "./ClothingForm";

const ClothingContainer = (props) => {
  const [clothing, setClothing] = useState(emptyClothing);
  const [types, setTypes] = useState(clothing.category === "" ? [] : Types);
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({});
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getClothingFromApi(id) {
      const clothingDisplay = await clothesApi.getClothing(id);
      setClothing(clothingDisplay);
      determineTypesFromCategory(clothingDisplay.category);
    }
    const clothingId = props.match.params.id;
    if (clothingId) {
      getClothingFromApi(clothingId);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.options.colors.length > 0 && clothing.id) {
      setColors(
        props.options.colors.filter(
          (color) => !clothing.colors.includes(color.id)
        )
      );
    }
    if (!clothing.id && clothing.colors.length === 0) {
      setColors(props.options.colors);
    }
  }, [props.options.colors, clothing]);

  function saveClothesHandler(event) {
    event.preventDefault();

    if (isFormValid()) {
      setSaving(true);
      if (clothing.id) {
        clothesApi
          .editClothing(clothing)
          .then(() => savingSuccessful())
          .catch(() => savingUnsucessful());
      } else {
        clothesApi
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

    setColors([
      ...colors,
      props.options.colors.find((c) => c.id === deletedColor),
    ]);
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
        ? props.options.colors.find((c) => c.id === prevColor)
        : color;
    });
    setColors(newSelectionColors);
  }

  return saveSuccessful ? (
    <Redirect to="/clothes" />
  ) : (
    <div className={styles.layout}>
      {props.options.colors.length > 0 ? (
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
          options={props.options}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    options: {
      colors: state.colors,
      categories: state.categories,
      occasions: state.occasions,
    },
  };
};

export default connect(mapStateToProps)(ClothingContainer);
