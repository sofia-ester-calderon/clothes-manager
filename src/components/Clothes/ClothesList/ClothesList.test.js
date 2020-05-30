import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesList from "./ClothesList";
import { Categories } from "../../../data/data";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const typesToDisplay = [Categories[0], Categories[1]];
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
    typesToDisplay,
    clothes,
    onClickGroup: jest.fn(),
    onFilter: jest.fn(),
    onDeleteClothing: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={createMemoryHistory()}>
      <ClothesList {...props} />
    </Router>
  );
}

it("should disaply only clothes which belong to the typesToDisplay", () => {
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

it("should only have arrow up for groups which belong to the typesToDisplay", () => {
  renderClothesList();
  expect(screen.getAllByAltText("Collapse")).toHaveLength(
    typesToDisplay.length
  );
});

it("should display clothes length", () => {
  renderClothesList();
  screen.getByText("Total: 3");
});
