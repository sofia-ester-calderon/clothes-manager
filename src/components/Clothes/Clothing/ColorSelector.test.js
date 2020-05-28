import React from "react";
import { render, screen } from "@testing-library/react";
import ColorSelector from "./ColorSelector";
import { Colors } from "../../../data/data";

const label = "label";
const selectedColor = Colors[0].name;

function renderColorSelector(args) {
  const defaultProps = {
    label,
    selectedColor,
    onColorChanged: jest.fn(),
    onColorDeleted: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorSelector {...props} />);
}

it("should disaply label, selectedColor and all colors as options", () => {
  renderColorSelector();
  screen.getByText(label);
  screen.getByDisplayValue(selectedColor);
  Colors.forEach((color) => {
    screen.getByText(color.name);
  });
});

it("should have all colors except those in clothingColors, except selectedColor", () => {
  const color1 = Colors[1].name;
  const color2 = Colors[2].name;
  renderColorSelector({
    clothingColors: [color1, color2, selectedColor],
  });
  expect(screen.queryByText(color1)).not.toBeInTheDocument();
  expect(screen.queryByText(color2)).not.toBeInTheDocument();
  screen.getByText(selectedColor);
  for (let i = 3; i < Colors.length; i++) {
    screen.getByText(Colors[i].name);
  }
});
