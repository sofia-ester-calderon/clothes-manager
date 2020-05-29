import React, { useState, useEffect } from "react";
import { clothesData } from "../../../data/data";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";

const AllClothesContainer = () => {
  const [filteredClothes, setFilteredClothes] = useState(clothesData);
  const [groupsToDisplay, setGroupsToDisplay] = useState([Categories[0]]);
  const [filters, setFilter] = useState({
    colors: "",
    occasion: "",
    rating: NaN,
  });

  useEffect(() => {
    let newFilteredClothes = clothesData;
    Object.keys(filters).forEach((key) => {
      if (key === "colors") {
        newFilteredClothes =
          filters.colors === ""
            ? newFilteredClothes
            : newFilteredClothes.filter((clothing) =>
                clothing.colors.includes(filters.colors)
              );
      } else if (key === "rating") {
        newFilteredClothes = isNaN(filters.rating)
          ? newFilteredClothes
          : newFilteredClothes.filter((clothing) => {
              return clothing.rating === filters.rating;
            });
      } else {
        newFilteredClothes =
          filters[key] === ""
            ? newFilteredClothes
            : newFilteredClothes.filter((clothing) => {
                return clothing[key] === filters[key];
              });
      }
    });

    setFilteredClothes(newFilteredClothes);
  }, [filters]);

  function toggleVisibilityHandler(group) {
    if (groupsToDisplay.includes(group)) {
      setGroupsToDisplay(
        groupsToDisplay.filter((displayGroup) => displayGroup !== group)
      );
    } else {
      setGroupsToDisplay([...groupsToDisplay, group]);
    }
  }

  function filterHandler(event, group) {
    const selectedValue = event.target.value;
    setFilter({
      ...filters,
      [group]: group === "rating" ? parseInt(selectedValue, 10) : selectedValue,
    });
  }

  return (
    <ClothesList
      clothes={filteredClothes}
      groupsToDisplay={groupsToDisplay}
      onClickGroup={toggleVisibilityHandler}
      onFilter={filterHandler}
    />
  );
};

export default AllClothesContainer;
