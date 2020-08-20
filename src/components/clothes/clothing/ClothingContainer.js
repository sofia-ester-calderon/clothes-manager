import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import styles from "./Clothing.module.css";
import { emptyClothing } from "../../../data/data";
import optionsActions from "../../../store/actions/optionsActions";
import clothesActions from "../../../store/actions/clothesActions";

import ClothingForm from "./ClothingForm";
import { ApiErrorContext } from "../../../hooks/ApiErrorProvider";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";

const ClothingContainer = ({
  options,
  loadColors,
  loadClothes,
  updateClothing,
  saveClothing,
  userId,
  onlyPublicColors,
  ...props
}) => {
  const [clothing, setClothing] = useState(props.clothing);
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const { apiStatus } = useContext(ApiErrorContext);

  useEffect(() => {
    if (
      saving &&
      (apiStatus.apiCallMethod === "put" || apiStatus.apiCallMethod === "post")
    ) {
      props.history.push("/clothes");
      toast.success("Clothing saved!");
    }
    if (saving && apiStatus.errorMessage) {
      setSaving(false);
    }
  }, [apiStatus, saving, props.history]);

  useEffect(() => {
    if (options.colors.length === 0 || (onlyPublicColors && userId)) {
      loadColors(userId);
    }
  }, [loadColors, userId, onlyPublicColors, options.colors]);

  useEffect(() => {
    if (props.clothes.length === 0) {
      loadClothes(userId);
    }
  }, [loadClothes, props.clothes, userId]);

  useEffect(() => {
    setClothing(props.clothing);
  }, [props.clothing]);

  useEffect(() => {
    const typesByCategory = options.types.filter(
      (type) => type.category === clothing.category
    );
    setTypes(typesByCategory);
  }, [clothing, options.types]);

  function saveClothesHandler(event) {
    event.preventDefault();

    if (isFormValid()) {
      setSaving(true);
      clothing.userId = userId;
      if (clothing.id) {
        updateClothing(clothing);
      } else {
        saveClothing(clothing);
      }
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

    setClothing((prevClothing) => ({
      ...prevClothing,
      [name]:
        name === "colors" || name === "seasons"
          ? [...prevClothing[name], value]
          : value,
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

  function removeArrayValueHandler(deletedValue, key) {
    setClothing((prevClothing) => ({
      ...prevClothing,
      [key]: prevClothing[key].filter((value) => value !== deletedValue),
    }));
  }

  function changeArrayValueHandler(event, prevValue, key) {
    const newValue = event.target.value;
    setClothing((prevClothing) => ({
      ...prevClothing,
      [key]: prevClothing[key].map((value) =>
        value === prevValue ? newValue : value
      ),
    }));
  }

  return (
    <div className={styles.layout}>
      {options.colors.length > 0 ? (
        <ClothingForm
          clothing={clothing}
          onSave={saveClothesHandler}
          onChange={changeClothingHandler}
          onRemoveArrayValue={removeArrayValueHandler}
          onChangeArrayValue={changeArrayValueHandler}
          types={types}
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
      ? state.clothes.find((clothing) => clothing.id === clothingId)
      : emptyClothing;
  return {
    options: {
      colors: state.options.colors,
      categories: state.options.categories,
      occasions: state.options.occasions,
      types: state.options.types,
      seasons: state.options.seasons,
    },
    clothing,
    clothes: state.clothes,
    userId: state.auth.userId,
    onlyPublicColors: state.options.onlyPublicOptions,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadColors: (userId) => dispatch(optionsActions.loadColors(userId)),
    loadClothes: (userId) => dispatch(clothesActions.loadClothes(userId)),
    updateClothing: (clothing) =>
      dispatch(clothesActions.updateClothing(clothing)),
    saveClothing: (clothing) => dispatch(clothesActions.saveClothing(clothing)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiErrorHandler(ClothingContainer));
