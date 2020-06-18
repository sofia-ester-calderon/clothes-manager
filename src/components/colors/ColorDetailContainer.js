import React, { useEffect, useState } from "react";
import ColorForm from "./ColorForm";
import { Colors, emptyColor } from "../../data/data";

const ColorDetailContainer = (props) => {
  const [color, setColor] = useState(emptyColor);

  useEffect(() => {
    const color = Colors.find((color) => color.name === props.match.params.id);
    setColor(color);
  }, [props.match.params.id]);

  function saveColorHandler(event) {
    event.preventDefault();
    console.log("save color", color);
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
      setColor((prevColor) => ({ ...prevColor, rgb: event.hex }));
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
