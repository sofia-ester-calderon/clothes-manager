import React from "react";
import styles from "./ColorCircle.module.css";
import { PropTypes } from "prop-types";

const ColorCircle = (props) => {
  console.log("colorcircle", props.color);
  return (
    <span
      data-testid="circle-color"
      className={styles.circle}
      style={{ backgroundColor: props.color.hash }}
    ></span>
  );
};

ColorCircle.propTypes = {
  color: PropTypes.object.isRequired,
};

export default ColorCircle;
