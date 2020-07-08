import React, { useEffect, useState } from "react";
import ColorForm from "./ColorForm";
import { emptyColor } from "../../../data/data";
import colorApi from "../../../api/colorsApi";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState(emptyColor);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getColorFromApi() {
      const colorData = await colorApi.getColor(props.match.params.id);
      setColor(colorData);
    }
    getColorFromApi();
  }, [props.match.params.id]);

  function saveColorHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      colorApi.editColor(color).then(() => {
        props.history.push("/colors");
      });
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

export default ColorDetailContainer;
