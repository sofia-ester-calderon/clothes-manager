import React from "react";
import styles from "./ColorCircle.module.css";
import { PropTypes } from "prop-types";
import { Colors } from "../../../data/data";

const ColorCircle = (props) => {
  function getRgbForColor(clothingColor) {
    return Colors.find((color) => color.name === clothingColor).rgb;
  }

  return (
    <span
      className={styles.circle}
      style={{ backgroundColor: getRgbForColor(props.color) }}
    ></span>
  );
};

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorCircle;
