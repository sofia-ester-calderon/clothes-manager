import React from "react";
import { render, screen } from "@testing-library/react";
import ColorSelector from "./ColorSelector";

const label = "label";

const colors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  { id: "def_col_4", name: "Yellow", hash: "#edea13" },
  { id: "def_col_5", name: "White", hash: "#ffffff" },
  { id: "def_col_6", name: "Black", hash: "#000000" },
];

const selectedColor = colors[0];

function renderColorSelector(args) {
  const defaultProps = {
    label,
    selectedColor,
    onColorChanged: jest.fn(),
    onColorDeleted: jest.fn(),
    colors,
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorSelector {...props} />);
}

it("should disaply label, selectedColor and all colors as options", () => {
  renderColorSelector();
  screen.getByText(label);
  screen.getByDisplayValue(selectedColor.name);
  colors.forEach((color) => {
    screen.getByText(color.name);
  });
});

it("should have all colors except those in clothingColors, except selectedColor", () => {
  const color1 = colors[1].id;
  const color2 = colors[2].id;
  renderColorSelector({
    clothingColors: [color1, color2, selectedColor.id],
  });
  expect(screen.queryByText(color1)).not.toBeInTheDocument();
  expect(screen.queryByText(color2)).not.toBeInTheDocument();
  screen.getByText(selectedColor.name);
  for (let i = 3; i < colors.length; i++) {
    screen.getByText(colors[i].name);
  }
});
