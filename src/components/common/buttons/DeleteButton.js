import React from "react";
import deleteIcon from "../../../assets/img/trash.png";
import styles from "./DeleteButton.module.css";
import { PropTypes } from "prop-types";

const DeleteButton = (props) => {
  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={props.onDelete}
    >
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
