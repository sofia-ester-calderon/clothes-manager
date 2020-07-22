import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import clothesApi from "../../../api/clothesApi";
import styles from "./Clothing.module.css";
import { emptyClothing } from "../../../data/data";
import optionsActions from "../../../store/actions/optionsActions";
import clothesActions from "../../../store/actions/clothesActions";

import ClothingForm from "./ClothingForm";
import { ApiErrorContext } from "../../../hooks/ApiErrorProvider";

const ClothingContainer = ({
  options,
  loadColors,
  loadClothes,
  updateClothing,
  ...props
}) => {
  const [clothing, setClothing] = useState(props.clothing);
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const { apiStatus } = useContext(ApiErrorContext);

  useEffect(() => {
    if (saving && apiStatus.apiCallMethod === "put") {
      props.history.push("/clothes");
      toast.success("Clothing saved!");
    }
    if (saving && apiStatus.errorMessage) {
      setSaving(false);
    }
  }, [apiStatus, saving, props.history]);

  useEffect(() => {
    if (props.clothes.length === 0) {
      loadClothes();
    }
    if (options.colors.length === 0) {
      loadColors();
    }
  }, [props.clothes, loadClothes, options.colors, loadColors]);

  useEffect(() => {
    setClothing(props.clothing);
  }, [props.clothing]);

  useEffect(() => {
    const typesByCategory = options.types.filter(
      (type) => type.category === clothing.category
    );
    setTypes(typesByCategory);
  }, [clothing, options.types]);

  useEffect(() => {
    if (options.colors.length > 0 && clothing.id) {
      setColors(
        options.colors.filter((color) => !clothing.colors.includes(color.id))
      );
    }
    if (clothing.colors.length === 0) {
      setColors(options.colors);
    }
  }, [options.colors, clothing]);

  function saveClothesHandler(event) {
    event.preventDefault();

    if (isFormValid()) {
      setSaving(true);
      if (clothing.id) {
        updateClothing(clothing);
      } else {
        clothesApi
          .saveClothing(clothing)
          .then(() => savingSuccessful())
          .catch(() => savingUnsucessful());
      }
    }
  }

  function savingSuccessful() {
    props.history.push("/clothes");

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
      typesByCategory = options.types.filter(
        (type) => type.category === category
      );
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

    setColors([...colors, options.colors.find((c) => c.id === deletedColor)]);
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
        ? options.colors.find((c) => c.id === prevColor)
        : color;
    });
    setColors(newSelectionColors);
  }

  return (
    <div className={styles.layout}>
      {options.colors.length > 0 ? (
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
          options={options}
        />
      ) : null}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const clothingId = ownProps.match.params.id;
  const clothing =
    clothingId && state.clothes.length > 0
      ? state.clothes.find((clothing) => (clothing.id = clothingId))
      : emptyClothing;
  return {
    options: {
      colors: state.options.colors,
      categories: state.options.categories,
      occasions: state.options.occasions,
      types: state.options.types,
    },
    clothing,
    clothes: state.clothes,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadColors: () => dispatch(optionsActions.loadColors()),
    loadClothes: () => dispatch(clothesActions.loadClothes()),
    updateClothing: (clothing) =>
      dispatch(clothesActions.updateClothing(clothing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClothingContainer);
