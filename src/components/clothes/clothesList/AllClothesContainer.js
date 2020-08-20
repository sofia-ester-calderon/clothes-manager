import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ClothesList from "./ClothesList";
import optionsActions from "../../../store/actions/optionsActions";
import clothesActions from "../../../store/actions/clothesActions";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";

const AllClothesContainer = ({
  options,
  allClothes,
  loadColors,
  loadClothes,
  deleteClothing,
  userId,
  onlyPublicColors,
}) => {
  const [filteredClothes, setFilteredClothes] = useState(allClothes);
  const [typesToDisplay, settypesToDisplay] = useState([options.categories[0]]);
  const [filters, setFilter] = useState({
    colors: "",
    occasion: "",
    rating: NaN,
  });

  useEffect(() => {
    if (options.colors.length === 0 || (onlyPublicColors && userId)) {
      loadColors(userId);
    }
  }, [loadColors, userId, onlyPublicColors, options.colors]);

  useEffect(() => {
    async function loadData() {
      if (allClothes.length === 0) {
        await loadClothes(userId);
      }
    }
    loadData();
  }, [loadClothes, userId, allClothes]);

  useEffect(() => {
    let newFilteredClothes = allClothes;
    Object.keys(filters).forEach((key) => {
      if (key === "colors" || key === "seasons") {
        newFilteredClothes =
          filters[key] === ""
            ? newFilteredClothes
            : newFilteredClothes.filter((clothing) =>
                clothing[key].includes(filters[key])
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
      seasons: state.options.seasons,
    },
    allClothes: state.clothes,
    userId: state.auth.userId,
    onlyPublicColors: state.options.onlyPublicOptions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadColors: (userId) => dispatch(optionsActions.loadColors(userId)),
    loadClothes: (userId) => dispatch(clothesActions.loadClothes(userId)),
    deleteClothing: (id) => dispatch(clothesActions.deleteClothing(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiErrorHandler(AllClothesContainer));
