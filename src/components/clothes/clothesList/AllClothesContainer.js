import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clothesApi from "../../../api/clothesApi";

import ClothesList from "./ClothesList";
import optionsActions from "../../../store/actions/optionsActions";

const AllClothesContainer = ({ options, initColors }) => {
  const [allClothes, setAllClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState(allClothes);
  const [typesToDisplay, settypesToDisplay] = useState([options.categories[0]]);
  const [filters, setFilter] = useState({
    colors: "",
    occasion: "",
    rating: NaN,
  });

  useEffect(() => {
    async function getClothesFromApi() {
      const clothes = await clothesApi.getClothes();
      setAllClothes(clothes);
      setFilteredClothes(clothes);
    }
    getClothesFromApi();
  }, []);

  useEffect(() => {
    if (options.colors.length === 0) {
      initColors();
    }
  }, [options.colors, initColors]);

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
    clothesApi.deleteClothing(deleteId);
    setAllClothes((prevClothes) =>
      prevClothes.filter((clothing) => clothing.id !== deleteId)
    );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initColors: () => dispatch(optionsActions.initColors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllClothesContainer);
