import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ClothesList from "./ClothesList";
import optionsActions from "../../../store/actions/optionsActions";
import clothesActions from "../../../store/actions/clothesActions";

const AllClothesContainer = ({
  options,
  allClothes,
  loadColors,
  loadClothes,
  deleteClothing,
}) => {
  const [filteredClothes, setFilteredClothes] = useState(allClothes);
  const [typesToDisplay, settypesToDisplay] = useState([options.categories[0]]);
  const [filters, setFilter] = useState({
    colors: "",
    occasion: "",
    rating: NaN,
  });

  useEffect(() => {
    if (allClothes.length === 0) {
      loadClothes();
    }
  }, [allClothes, loadClothes]);

  useEffect(() => {
    if (options.colors.length === 0) {
      loadColors();
    }
  }, [options.colors, loadColors]);

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
    deleteClothing(deleteId);
  }

  return (
    <ClothesList
      clothes={filteredClothes}
      typesToDisplay={typesToDisplay}
      onClickCategory={toggleVisibilityHandler}
      onFilter={filterHandler}
      onDeleteClothing={deleteClothingHandler}
      options={options}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    options: {
      colors: state.options.colors,
      categories: state.options.categories,
      occasions: state.options.occasions,
    },
    allClothes: state.clothes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadColors: () => dispatch(optionsActions.loadColors()),
    loadClothes: () => dispatch(clothesActions.loadClothes()),
    deleteClothing: (id) => dispatch(clothesActions.deleteClothing(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllClothesContainer);
