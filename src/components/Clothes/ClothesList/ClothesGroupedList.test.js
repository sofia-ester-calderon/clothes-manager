import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesGroupedList from "./ClothesGroupedList";
import { TOPS, Colors } from "../../../data/data";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const header = "header";
const colors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
];

const clothes = [
  {
    id: 1,
    category: TOPS,
    type: "typ2",
    colors: [colors[0].id, colors[1].id, colors[2].id],
    rating: 1,
    occasion: "occasion",
  },
];

function renderClothesGroupedList(args) {
  const defaultProps = {
    header,
    clothes,
    colors,
    display: true,
    onClickHeader: jest.fn(),
    onDelete: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={createMemoryHistory()}>
      <ClothesGroupedList {...props} />
    </Router>
  );
}

it("should render the header with clothes length", () => {
  renderClothesGroupedList();
  screen.getByText(header + " (1)");
});

it("should only render header if clothes empty", () => {
  renderClothesGroupedList({ clothes: [] });
  screen.getByText(header);
});

it("should display all clothes and up-arrow if display is true", () => {
  renderClothesGroupedList();
  screen.getByAltText("Collapse");
  clothes.forEach((clothing) => {
    screen.getByText(clothing.type);
    screen.getByText(clothing.occasion);
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(
      clothing.colors.length
    );
  });
});

it("should display down-arrow and no clothes if display is false", () => {
  renderClothesGroupedList({ display: false });
  screen.getByAltText("Show");
  clothes.forEach((clothing) => {
    expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    expect(screen.queryByText(clothing.occasion)).not.toBeInTheDocument();
    expect(screen.queryByTestId("circle-color")).not.toBeInTheDocument();
  });
});

it("should not display any arrow if no clothes are displayed", () => {
  renderClothesGroupedList({ clothes: [] });
  expect(screen.queryByAltText("Show")).not.toBeInTheDocument();
  expect(screen.queryByAltText("Collapse")).not.toBeInTheDocument();
});
