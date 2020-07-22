import React from "react";
import { PropTypes } from "prop-types";

import styles from "./ClothesList.module.css";

import SelectInput from "../../common/inputs/select/SelectInput";
import ClothesGroupedList from "./ClothesGroupedList";

const ClothesList = ({
  clothes = [],
  typesToDisplay,
  onClickCategory,
  onFilter,
  onDeleteClothing,
  options,
}) => {
  function getClothesByCategory(category) {
    return clothes.filter((clothing) => clothing.category === category);
  }
  return (
    <>
      <h2 className="mb-4">All My Clothes</h2>
      <h4 className="mb-4">Total: {clothes.length}</h4>
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
                    options={options.colors.map((color) => ({
                      value: color.id,
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
                    options={options.occasions.map((occasion) => ({
                      value: occasion,
                      text: occasion,
                    }))}
                    onChange={(e) => onFilter(e, "occasion")}
                  />
                </div>
              </th>
              <th className={styles.cellWidth}>
                Season
                <div className={styles.filterBox}>
                  <SelectInput
                    name="season-filter"
                    defaultOption="All Seasons"
                    options={options.seasons.map((season) => ({
                      value: season,
                      text: season,
                    }))}
                    onChange={(e) => onFilter(e, "season")}
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
              <th className={styles.iconCellWidth}></th>
              <th className={styles.iconCellWidth}></th>
            </tr>
          </thead>
        </table>
        {options.categories.map((category) => (
          <ClothesGroupedList
            key={category}
            header={category}
            clothes={getClothesByCategory(category)}
            display={typesToDisplay.includes(category)}
            onClickHeader={() => onClickCategory(category)}
            onDelete={onDeleteClothing}
            colors={options.colors}
          />
        ))}
      </>
    </>
  );
};

ClothesList.propTypes = {
  clothes: PropTypes.array,
  options: PropTypes.object,
  typesToDisplay: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  onDeleteClothing: PropTypes.func.isRequired,
};

export default ClothesList;
