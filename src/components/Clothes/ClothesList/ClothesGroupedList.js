import React from "react";
import { PropTypes } from "prop-types";
import styles from "./ClothesList.module.css";

const ClothesGroupedList = ({ header, clothes, display, onClickHeader }) => {
  return (
    <>
      <thead
        className={"thead-light " + styles.groupHeader}
        onClick={onClickHeader}
      >
        <tr>
          <th colSpan="4">{header}</th>
        </tr>
      </thead>
      {display ? (
        <tbody>
          {clothes.map((clothing) => (
            <tr key={clothing.id}>
              <td>{clothing.type}</td>
              <td>{clothing.colors}</td>
              <td>{clothing.occasion}</td>
              <td>{clothing.rating}</td>
            </tr>
          ))}
        </tbody>
      ) : null}
    </>
  );
};

ClothesGroupedList.propTypes = {
  header: PropTypes.string.isRequired,
  clothes: PropTypes.array.isRequired,
  display: PropTypes.bool.isRequired,
  onClickHeader: PropTypes.func.isRequired,
};

export default ClothesGroupedList;
