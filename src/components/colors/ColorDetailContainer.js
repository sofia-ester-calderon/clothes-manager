import React, { useEffect, useState } from "react";
import ColorForm from "./ColorForm";
import { emptyColor } from "../../data/data";
import * as api from "../../api/colorsApi";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState(emptyColor);

  useEffect(() => {
    async function getColorFromApi() {
      const colorData = await api.getColor(props.match.params.id);
      setColor(colorData);
    }
    getColorFromApi();
  }, [props.match.params.id]);

  function saveColorHandler(event) {
    event.preventDefault();
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
    />
  );
};

export default ColorDetailContainer;
