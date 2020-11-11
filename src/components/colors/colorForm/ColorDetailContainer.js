import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import optionsActions from "../../../store/actions/optionsActions";
import { emptyColor } from "../../../data/data";

import ColorForm from "./ColorForm";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import clothesActions from "../../../store/actions/clothesActions";

const ColorDetailContainer = ({
  color,
  userId,
  clothes,
  loadClothes,
  onSaveColor,
  onUpdateColor,
  ...props
}) => {
  const [chosenColor, setChosenColor] = useState({ ...color });
  const [errors, setErrors] = useState({});
  const [loadingClothes, setLoadingClothes] = useState(false);

  useEffect(() => {
    setChosenColor(color);
  }, [color]);

  useEffect(() => {
    if (clothes.length === 0 && userId && !loadingClothes) {
      console.log("loading clothes");
      setLoadingClothes(true);
      loadClothes(userId);
    }
  }, [clothes, userId, loadClothes, loadingClothes]);

  function saveColorHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      if (chosenColor.id) {
        onUpdateColor(chosenColor);
      } else {
        onSaveColor(chosenColor, userId);
      }
      props.history.push("/colors");
    }
  }

  function isFormValid() {
    const errors = {};
    if (!chosenColor.name || chosenColor.name === "") {
      errors.name = "Name is required";
    }
    if (!userId) {
      errors.name = "You must be logged in for this function";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function cancelFormHandler(event) {
    event.preventDefault();
    props.history.push("/colors");
  }

  function changeColorHandler(event) {
    if (event.target) {
      const { name, value } = event.target;
      setChosenColor((prevColor) => ({ ...prevColor, [name]: value }));
    }
    if (event.hex) {
      setChosenColor((prevColor) => ({ ...prevColor, hash: event.hex }));
    }
  }

  function deleteColorHandler(event) {
    event.preventDefault();
    confirmAlert({
      message: "Are you sure you want to proceed?",
      buttons: [
        {
          label: "Yes",
          onClick: () => checkColorInClothes(),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function checkColorInClothes() {
    console.log("checking if color is used");
    debugger;
    const used = clothes.find((clothing) =>
      clothing.colors.includes(chosenColor.id)
    );
    console.log("used", used);
    if (used) {
      confirmAlert({
        message:
          "This color is being used. It cannot be deleted until no clothes are using it.",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    }
  }

  return (
    <ColorForm
      color={chosenColor}
      onChangeColor={changeColorHandler}
      onSave={saveColorHandler}
      onCancel={cancelFormHandler}
      onDelete={deleteColorHandler}
      errors={errors}
    />
  );
};

function mapStateToProps(state, ownProps) {
  const colorId = ownProps.match.params.id;
  let color = null;
  if (!colorId || colorId === "new" || state.options.colors.length === 0) {
    color = emptyColor;
  } else {
    color = state.options.colors.find((color) => color.id === colorId);
    if (!color) {
      color = emptyColor;
    }
  }
  return { color, userId: state.auth.userId, clothes: state.clothes };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateColor: (color) => dispatch(optionsActions.updateColor(color)),
    onSaveColor: (color, userId) =>
      dispatch(optionsActions.saveColor(color, userId)),
    loadClothes: (userId) => dispatch(clothesActions.loadClothes(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiErrorHandler(ColorDetailContainer));
