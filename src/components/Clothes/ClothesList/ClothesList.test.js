import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";

const groupsToDisplay = [Categories[0], Categories[1]];
const clothes = [
  {
    id: 1,
    category: Categories[0],
    type: "type1",
    colors: [],
    rating: 4,
    occasion: "occasion1",
  },
  {
    id: 2,
    category: Categories[1],
    type: "type2",
    colors: [],
    rating: 4,
    occasion: "occasion2",
  },
  {
    id: 3,
    category: Categories[2],
    type: "type3",
    colors: [],
    rating: 4,
    occasion: "occasion3",
  },
];

function renderClothesList(args) {
  const defaultProps = {
    groupsToDisplay,
    clothes,
    onClickGroup: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<ClothesList {...props} />);
}

it("should disaply only clothes which belong to the groupsToDisplay", () => {
  renderClothesList();
  // first clothing should be displayed
  const clothing1 = clothes[0];
  screen.getByText(clothing1.type);
  screen.getByText(clothing1.occasion);
  // second clothing should be displayed
  const clothing2 = clothes[1];
  screen.getByText(clothing2.type);
  screen.getByText(clothing2.occasion);
  // third clothing should be displayed
  const clothing3 = clothes[2];
  expect(screen.queryByText(clothing3.type)).not.toBeInTheDocument();
  expect(screen.queryByText(clothing3.occasion)).not.toBeInTheDocument();
});

it("should only have arrow up for groups which belong to the groupsToDisplay", () => {
  renderClothesList();
  expect(screen.getAllByAltText("Collapse")).toHaveLength(
    groupsToDisplay.length
  );
  expect(screen.getAllByAltText("Show")).toHaveLength(
    Categories.length - groupsToDisplay.length
  );
});
