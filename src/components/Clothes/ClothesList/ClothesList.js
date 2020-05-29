import React from "react";
import { PropTypes } from "prop-types";
import ClothesGroupedList from "./ClothesGroupedList";
import { Categories, Colors, Occasion } from "../../../data/data";
import styles from "./ClothesList.module.css";
import SelectInput from "../../common/inputs/select/SelectInput";

const ClothesList = ({
  clothes = [],
  groupsToDisplay,
  onClickGroup,
  onFilter,
}) => {
  function getClothesByGroup(group) {
    return clothes.filter((clothing) => clothing.category === group);
  }
  return (
    <>
      <h2 className="mb-4">All My Clothes</h2>
      <>
        <table className="table">
          <thead>
            <tr>
              <th className={styles.cellWidth} style={{ verticalAlign: "top" }}>
                Type
              </th>
              <th className={styles.cellWidth}>
                Colors
                <div className={styles.filterBox}>
                  <SelectInput
                    name="color-filter"
                    defaultOption="All Colors"
                    options={Colors.map((color) => ({
                      value: color.name,
                      text: color.name,
                    }))}
                    onChange={(e) => onFilter(e, "colors")}
                  />
                </div>
              </th>
              <th className={styles.cellWidth}>
                Occasion
                <div className={styles.filterBox}>
                  <SelectInput
                    name="occasion-filter"
                    defaultOption="All Occasions"
                    options={Occasion.map((occasion) => ({
                      value: occasion,
                      text: occasion,
                    }))}
                    onChange={(e) => onFilter(e, "occasion")}
                  />
                </div>
              </th>
              <th className={styles.cellWidth}>
                Rating
                <div className={styles.filterBox}>
                  <SelectInput
                    name="occasion-filter"
                    defaultOption="All Ratings"
                    options={[1, 2, 3, 4, 5].map((rating) => ({
                      value: rating,
                      text: rating,
                    }))}
                    onChange={(e) => onFilter(e, "rating")}
                  />
                </div>
              </th>
            </tr>
          </thead>
        </table>
        {Categories.map((group) => (
          <ClothesGroupedList
            key={group}
            header={group}
            clothes={getClothesByGroup(group)}
            display={groupsToDisplay.includes(group)}
            onClickHeader={() => onClickGroup(group)}
          />
        ))}
      </>
    </>
  );
};

ClothesList.propTypes = {
  clothes: PropTypes.array,
  groupsToDisplay: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default ClothesList;
