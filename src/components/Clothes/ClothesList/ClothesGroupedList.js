import React from "react";
import { PropTypes } from "prop-types";
import styles from "./ClothesList.module.css";
import upArrow from "../../../assets/img/up-arrow.png";
import downArrow from "../../../assets/img/down-arrow.png";
import ColorCircle from "../../common/specialForms/ColorCircle";

const ClothesGroupedList = ({ header, clothes, display, onClickHeader }) => {
  return (
    <>
      <thead
        className={["thead-light ", styles.groupHeader].join(" ")}
        onClick={onClickHeader}
      >
        <tr>
          <th colSpan="3">{header}</th>
          <th className={styles.arrow}>
            <img
              className={styles.arrowImg}
              src={display ? upArrow : downArrow}
              alt="Collapse"
            />
          </th>
        </tr>
      </thead>
      {display ? (
        <tbody>
          {clothes.map((clothing) => (
            <tr key={clothing.id}>
              <td>{clothing.type}</td>
              <td>
                {clothing.colors.map((color) => (
                  <ColorCircle color={color} />
                ))}
              </td>
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
