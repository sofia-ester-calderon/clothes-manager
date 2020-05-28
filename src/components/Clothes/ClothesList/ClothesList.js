import React from "react";
import { PropTypes } from "prop-types";
import ClothesGroupedList from "./ClothesGroupedList";
import { Categories } from "../../../data/data";
import styles from "./ClothesList.module.css";

const ClothesList = ({ clothes = [], groupsToDisplay, onClickGroup }) => {
  function getClothesByGroup(group) {
    return clothes.filter((clothing) => clothing.category === group);
  }
  return (
    <>
      <h2 className="mb-4">All My Clothes</h2>
      {clothes.length === 0 ? (
        <p>You have no clothes yet</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className={styles.tableHeader}>Type</th>
              <th className={styles.tableHeader}>Colors</th>
              <th className={styles.tableHeader}>Occasion</th>
              <th className={styles.tableHeader}>Rating</th>
            </tr>
          </thead>
          {Categories.map((group) => (
            <ClothesGroupedList
              key={group}
              header={group}
              clothes={getClothesByGroup(group)}
              display={groupsToDisplay.includes(group)}
              onClickHeader={() => onClickGroup(group)}
            />
          ))}
        </table>
      )}
    </>
  );
};

ClothesList.propTypes = {
  clothes: PropTypes.array,
  groupsToDisplay: PropTypes.array.isRequired,
};

export default ClothesList;
