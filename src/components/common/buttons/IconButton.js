import React from "react";
import styles from "./IconButton.module.css";
import { PropTypes } from "prop-types";

const IconButton = ({ onClick, icon, altText = "button" }) => {
  return (
    <button type="button" className={styles.iconButton} onClick={onClick}>
      <img src={icon} alt={altText} />
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default IconButton;
