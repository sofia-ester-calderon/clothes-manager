import React, { useState, useEffect } from "react";
import { clothesData } from "../../../data/data";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";

const AllClothesContainer = () => {
  const [filteredClothes, setFilteredClothes] = useState(clothesData);
  const [typesToDisplay, settypesToDisplay] = useState([Categories[0]]);
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

  function toggleVisibilityHandler(category) {
    if (typesToDisplay.includes(category)) {
      settypesToDisplay(
        typesToDisplay.filter((displayCategory) => displayCategory !== category)
      );
    } else {
      settypesToDisplay([...typesToDisplay, category]);
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
      typesToDisplay={typesToDisplay}
      onClickCategory={toggleVisibilityHandler}
      onFilter={filterHandler}
    />
  );
};

export default AllClothesContainer;
