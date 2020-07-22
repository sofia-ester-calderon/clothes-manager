import React from "react";
import { render, screen } from "@testing-library/react";

import MultiOptionsSelector from "./MultiOptionsSelector";

const label = "label";

const possibleOptions = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  { id: "def_col_4", name: "Yellow", hash: "#edea13" },
  { id: "def_col_5", name: "White", hash: "#ffffff" },
  { id: "def_col_6", name: "Black", hash: "#000000" },
];

const selectedValue = possibleOptions[0];

function renderMultiOptionsSelector(args) {
  const defaultProps = {
    label,
    selectedValue,
    onSelectionChanged: jest.fn(),
    onSelectionDeleted: jest.fn(),
    possibleOptions,
    colorSelector: false,
  };
  const props = { ...defaultProps, ...args };
  return render(<MultiOptionsSelector {...props} />);
}

it("should disaply label, selectedColor and all colors as options", () => {
  renderMultiOptionsSelector();
  screen.getByText(label);
  screen.getByDisplayValue(selectedValue.name);
  possibleOptions.forEach((color) => {
    screen.getByText(color.name);
  });
});

it("should have all colors except those in clothingValues, except selectedColor", () => {
  const color1 = possibleOptions[1].id;
  const color2 = possibleOptions[2].id;
  renderMultiOptionsSelector({
    clothingValues: [color1, color2, selectedValue.id],
  });
  expect(screen.queryByText(color1)).not.toBeInTheDocument();
  expect(screen.queryByText(color2)).not.toBeInTheDocument();
  screen.getByText(selectedValue.name);
  for (let i = 3; i < possibleOptions.length; i++) {
    screen.getByText(possibleOptions[i].name);
  }
});

it("should display color circle if colorSelector is true", () => {
  renderMultiOptionsSelector({ colorSelector: true });
  expect(screen.queryAllByTestId("circle-color")).toHaveLength(1);
});

it("should not display color circle if colorSelector is false", () => {
  renderMultiOptionsSelector({ colorSelector: false });
  expect(screen.queryAllByTestId("circle-color")).toHaveLength(0);
});
