import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import optionsActions from "../../../store/actions/optionsActions";
import { emptyColor } from "../../../data/data";

import ColorForm from "./ColorForm";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState({ ...props.color });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setColor(props.color);
  }, [props.color]);

  function saveColorHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      props.onUpdateColor(color);
      props.history.push("/colors");
    }
  }

  function isFormValid() {
    const errors = {};
    if (!color.name || color.name === "") {
      errors.name = "Name is required";
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

  return (
    <ColorForm
      color={color}
      onChangeColor={changeColorHandler}
      onSave={saveColorHandler}
      onCancel={cancelFormHandler}
      errors={errors}
    />
  );
};

function mapStateToProps(state, ownProps) {
  const colorId = ownProps.match.params.id;
  const color =
    colorId && state.options.colors.length > 0
      ? state.options.colors.find((color) => color.id === colorId)
      : emptyColor;
  return { color };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateColor: (color) => dispatch(optionsActions.updateColor(color)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorDetailContainer);
