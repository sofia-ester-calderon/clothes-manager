import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesGroupedList from "./ClothesGroupedList";
import { TOPS } from "../../../data/data";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

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
    type: "type",
    colors: [colors[0].id, colors[1].id, colors[2].id],
    rating: 1,
    occasion: "occasion",
  },
];

function renderClothesGroupedList(args) {
  const defaultProps = {
    header,
    display: true,
    onClickHeader: jest.fn(),
    onDelete: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={createMemoryHistory()}>
      <AllColorsContext.Provider value={colors}>
        <ClothesGroupedList {...props} />
      </AllColorsContext.Provider>
    </Router>
  );
}

describe("given there are clothes", () => {
  it("should render the header with clothes length in braquets", () => {
    renderClothesGroupedList({ clothes });
    screen.getByText(header + " (1)");
  });

  it("should display visibility toggle icon", () => {
    renderClothesGroupedList({ clothes });
    screen.getByAltText("Collapse");
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
    screen.getByText("type");
    screen.getByText("occasion");
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(3);
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
