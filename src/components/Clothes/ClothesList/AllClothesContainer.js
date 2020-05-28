import React, { useState } from "react";
import { clothesData } from "../../../data/data";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";

const AllClothesContainer = () => {
  const [clothes, setClothes] = useState(clothesData);
  const [groupsToDisplay, setGroupsToDisplay] = useState([Categories[0]]);

  function toggleVisibilityHandler(group) {
    console.log("header clicked", group);
    if (groupsToDisplay.includes(group)) {
      setGroupsToDisplay(
        groupsToDisplay.filter((displayGroup) => displayGroup !== group)
      );
    } else {
      setGroupsToDisplay([...groupsToDisplay, group]);
    }
  }

  return (
    <ClothesList
      clothes={clothes}
      groupsToDisplay={groupsToDisplay}
      onClickGroup={toggleVisibilityHandler}
    />
  );
};

export default AllClothesContainer;
