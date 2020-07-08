import React, { useEffect, useState } from "react";
import ColorForm from "./ColorForm";
import { emptyColor } from "../../../data/data";
import colorApi from "../../../api/colorsApi";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState(props.color);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   async function getColorFromApi() {
  //     const colorData = await colorApi.getColor(props.match.params.id);
  //     setColor(colorData);
  //   }
  //   getColorFromApi();
  // }, [props.match.params.id]);

  function saveColorHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      props.onUpdateColor(color);
      // colorApi.editColor(color).then(() => {
      props.history.push("/colors");
      // });
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
    colorId && state.colors.length > 0
      ? state.colors.find((color) => color.id === colorId)
      : emptyColor;
  return { color };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateColor: (color) => dispatch({ type: actionTypes.EDIT_COLOR, color }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorDetailContainer);
