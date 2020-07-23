import React from "react";
import { render, screen } from "@testing-library/react";

import MultiOptionsSelector from "./MultiOptionsSelector";

const label = "label";

function renderMultiOptionsSelector(args) {
  const defaultProps = {
    label,
    onSelectionChanged: jest.fn(),
    onSelectionDeleted: jest.fn(),
    possibleOptions: [
      { id: "def_col_1", name: "Red", hash: "#ff1100" },
      { id: "def_col_2", name: "Green", hash: "#00a80b" },
    ],
    selectedValue: { id: "def_col_1", name: "Red", hash: "#ff1100" },
    colorSelector: false,
  };
  const props = { ...defaultProps, ...args };
  return render(<MultiOptionsSelector {...props} />);
}

describe("given no clothingValues are passed as param", () => {
  describe("it should display selectedValue as selected and all possible options", () => {
    it("if possibleOptions is colorObject list", () => {
      const possibleOptions = [
        { id: "def_col_1", name: "Red", hash: "#ff1100" },
        { id: "def_col_2", name: "Green", hash: "#00a80b" },
        { id: "def_col_3", name: "Blue", hash: "#0019bf" },
      ];

      renderMultiOptionsSelector({
        possibleOptions,
        selectedValue: possibleOptions[0],
      });
      screen.getByDisplayValue("Red");
      screen.getByText("Green");
      screen.getByText("Blue");
    });

    it("if possibleOptions is a string array", () => {
      const possibleOptions = ["Option1", "Option2", "Option3"];

      renderMultiOptionsSelector({
        possibleOptions,
        selectedValue: "Option1",
      });
      screen.getByDisplayValue("Option1");
      screen.getByText("Option2");
      screen.getByText("Option3");
    });
  });
});

describe("given clothingValues are passed as param", () => {
  describe("should only display as options the selectedValue and options which are not in clothingValues", () => {
    it("if possibleOptions is colorObject list", () => {
      const possibleOptions = [
        { id: "def_col_1", name: "Red", hash: "#ff1100" },
        { id: "def_col_2", name: "Green", hash: "#00a80b" },
        { id: "def_col_3", name: "Blue", hash: "#0019bf" },
        { id: "def_col_4", name: "Yellow", hash: "#edea13" },
        { id: "def_col_5", name: "White", hash: "#ffffff" },
        { id: "def_col_6", name: "Black", hash: "#000000" },
      ];
      const clothingValues = ["def_col_1", "def_col_2", "def_col_3"];

      renderMultiOptionsSelector({
        possibleOptions,
        clothingValues,
        selectedValue: possibleOptions[0],
      });

      expect(screen.queryByText("Green")).not.toBeInTheDocument();
      expect(screen.queryByText("Blue")).not.toBeInTheDocument();
      screen.getByText("Red");
      screen.getByText("Yellow");
      screen.getByText("White");
      screen.getByText("Black");
    });

    it("if possibleOptions is a string array", () => {
      const possibleOptions = [
        "Option1",
        "Option2",
        "Option3",
        "Option4",
        "Option5",
        "Option6",
      ];

      const clothingValues = ["Option1", "Option2", "Option3"];

      renderMultiOptionsSelector({
        possibleOptions,
        clothingValues,
        selectedValue: "Option2",
      });

      expect(screen.queryByText("Option1")).not.toBeInTheDocument();
      expect(screen.queryByText("Option3")).not.toBeInTheDocument();
      screen.getByText("Option2");
      screen.getByText("Option4");
      screen.getByText("Option5");
      screen.getByText("Option6");
    });
  });
});

describe("given colorSelector param is passed", () => {
  it("should display color circle if colorSelector is true", () => {
    renderMultiOptionsSelector({ colorSelector: true });
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(1);
  });

  it("should not display color circle if colorSelector is false", () => {
    renderMultiOptionsSelector({ colorSelector: false });
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(0);
  });
});
