import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesList from "./ClothesList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const typesToDisplay = ["Tops", "Bottoms"];
const clothes = [
  {
    id: 1,
    category: "Tops",
    type: "type1",
    colors: [],
    rating: 4,
    occasion: "occasion1",
  },
  {
    id: 2,
    category: "Bottoms",
    type: "type2",
    colors: [],
    rating: 4,
    occasion: "occasion2",
  },
  {
    id: 3,
    category: "Underwear",
    type: "type3",
    colors: [],
    rating: 4,
    occasion: "occasion3",
  },
];

const options = {
  colors: [
    { id: "def_col_1", name: "Red", hash: "#ff1100" },
    { id: "def_col_2", name: "Green", hash: "#00a80b" },
    { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  ],
  categories: ["Tops", "Bottoms", "Underwear", "Shoes", "Accessories"],
  occasions: ["Sport", "Formal", "Everyday"],
};

function renderClothesList(args) {
  const defaultProps = {
    typesToDisplay,
    clothes,
    onClickGroup: jest.fn(),
    onFilter: jest.fn(),
    onDeleteClothing: jest.fn(),
    options,
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
