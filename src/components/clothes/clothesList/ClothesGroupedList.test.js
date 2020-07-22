import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import ClothesGroupedList from "./ClothesGroupedList";

const header = "header";
const colors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
];

const clothes = [
  {
    id: 1,
    category: "Tops",
    type: "type1",
    colors: [colors[0].id, colors[1].id, colors[2].id],
    rating: 1,
    occasion: "occasion1",
    season: "season1",
  },
  {
    id: 2,
    category: "Tops",
    type: "type2",
    colors: [colors[0].id],
    rating: 1,
    occasion: "occasion2",
    season: "season2",
  },
];

function renderClothesGroupedList(args) {
  const defaultProps = {
    header,
    display: true,
    onClickHeader: jest.fn(),
    onDelete: jest.fn(),
    colors,
  };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={createMemoryHistory()}>
      <ClothesGroupedList {...props} />
    </Router>
  );
}

describe("given there are clothes", () => {
  it("should render the header with clothes length in braquets", () => {
    renderClothesGroupedList({ clothes });
    screen.getByText(header + " (2)");
  });

  it("should display visibility toggle icon", () => {
    renderClothesGroupedList({ clothes });
    screen.getByAltText("Collapse");
  });

  it("should render all the propties of the clothes", () => {
    renderClothesGroupedList({ clothes });

    screen.getByText("type1");
    screen.getByText("occasion1");
    screen.getByText("season1");

    screen.getByText("type2");
    screen.getByText("occasion2");
    screen.getByText("season2");
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(4);
  });
});

describe("given clothes are empty", () => {
  it("should only render header", () => {
    renderClothesGroupedList({ clothes: [] });
    screen.getByText(header);
  });

  it("should not display any visibility toggle icon", () => {
    renderClothesGroupedList({ clothes: [] });
    expect(screen.queryByAltText("Show")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Collapse")).not.toBeInTheDocument();
  });
});

describe("given display is true", () => {
  it("should display all clothes", () => {
    renderClothesGroupedList({ clothes, display: true });
    screen.getByText("type1");
    screen.getByText("occasion1");
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(4);
  });

  it("should display collapse icon", () => {
    renderClothesGroupedList({ clothes, display: true });
    screen.getByAltText("Collapse");
  });
});

describe("given display is false", () => {
  it("should display all clothes", () => {
    renderClothesGroupedList({ clothes, display: false });
    expect(screen.queryByText("type")).not.toBeInTheDocument();
    expect(screen.queryByText("occasion")).not.toBeInTheDocument();
    expect(screen.queryByTestId("circle-color")).not.toBeInTheDocument();
  });

  it("should display collapse icon", () => {
    renderClothesGroupedList({ clothes, display: false });
    screen.getByAltText("Show");
  });
});
