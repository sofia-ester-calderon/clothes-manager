import React from "react";
import styles from "./ColorCircle.module.css";
import { PropTypes } from "prop-types";

const ColorCircle = (props) => {
  return (
    <div
      className={styles.circle}
      style={{ backgroundColor: props.color }}
    ></div>
  );
};

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorCircle;
