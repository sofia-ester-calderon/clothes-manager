import React from "react";
import styles from "./IconButton.module.css";
import { PropTypes } from "prop-types";

const IconButton = ({ onClick, icon }) => {
  return (
    <button type="button" className={styles.iconButton} onClick={onClick}>
      <img src={icon} alt="Delete" />
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
