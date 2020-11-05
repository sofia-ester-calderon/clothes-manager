import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import optionsActions from "../../../store/actions/optionsActions";
import { emptyColor } from "../../../data/data";

import ColorForm from "./ColorForm";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState({ ...props.color });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setColor(props.color);
  }, [props.color]);

  function saveColorHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      if (color.id) {
        props.onUpdateColor(color);
      } else {
        props.onSaveColor(color, props.userId);
      }
      props.history.push("/colors");
    }
  }

  function isFormValid() {
    const errors = {};
    if (!color.name || color.name === "") {
      errors.name = "Name is required";
    }
    if (!props.userId) {
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
      setColor((prevColor) => ({ ...prevColor, [name]: value }));
    }
    if (event.hex) {
      setColor((prevColor) => ({ ...prevColor, hash: event.hex }));
    }
  }

  function deleteColorHandler(event) {
    event.preventDefault();
    confirmAlert({
      message: "Are you sure you want to proceed?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  }

  return (
    <ColorForm
      color={color}
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
  }
  return { color, userId: state.auth.userId };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateColor: (color) => dispatch(optionsActions.updateColor(color)),
    onSaveColor: (color, userId) =>
      dispatch(optionsActions.saveColor(color, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiErrorHandler(ColorDetailContainer));
