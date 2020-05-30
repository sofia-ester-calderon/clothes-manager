import React, { useState, useEffect } from "react";
import { clothesData } from "../../../data/data";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";

const AllClothesContainer = () => {
  const [allClothes, setAllClothes] = useState(clothesData);
  const [filteredClothes, setFilteredClothes] = useState(allClothes);
  const [typesToDisplay, settypesToDisplay] = useState([Categories[0]]);
  const [filters, setFilter] = useState({
    colors: "",
    occasion: "",
    rating: NaN,
  });

  useEffect(() => {
    let newFilteredClothes = allClothes;
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
  }, [filters, allClothes]);

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

  function deleteClothingHandler(deleteId) {
    setAllClothes((prevClothes) =>
      prevClothes.filter((clothing) => clothing.id !== deleteId)
    );
  }

  function editClothingHandler(editId) {
    console.log("editing clothes", editId);
  }

  return (
    <ClothesList
      clothes={filteredClothes}
      typesToDisplay={typesToDisplay}
      onClickCategory={toggleVisibilityHandler}
      onFilter={filterHandler}
      onDeleteClothing={deleteClothingHandler}
      onEditClothing={editClothingHandler}
    />
  );
};

export default AllClothesContainer;
