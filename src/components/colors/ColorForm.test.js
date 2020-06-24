import React from "react";
import { render, screen } from "@testing-library/react";
import ColorForm from "./ColorForm";

const color = { name: "Red", hash: "#FF1100" };

HTMLCanvasElement.prototype.getContext = jest.fn();

function renderColorForm(args) {
  const defaultProps = {
    color,
    onChangeColor: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorForm {...props} />);
}

it("should render the color name and hex", () => {
  renderColorForm();

  const input = screen.getByLabelText("Name");
  expect(input.value).toBe(color.name);
  screen.getByDisplayValue(color.hash);
});
