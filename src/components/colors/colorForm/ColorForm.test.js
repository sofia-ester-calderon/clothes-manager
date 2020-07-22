import React from "react";
import { render, screen } from "@testing-library/react";
import ColorForm from "./ColorForm";

const color = { id: "def_col_1", name: "Red", hash: "#FF1100" };

HTMLCanvasElement.prototype.getContext = jest.fn();

function renderColorForm(args) {
  const defaultProps = {
    color,
    onChangeColor: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorForm {...props} />);
}

it("should render Edit as title if color has an id", () => {
  renderColorForm();

  screen.getByText("Edit");
});

it("should render New Color as title if color has an id", () => {
  const color = { name: "Red", hash: "#FF1100" };

  renderColorForm({ color });

  screen.getByText("New Color");
});

it("should render the color name and hex", () => {
  renderColorForm();

  const input = screen.getByLabelText("Name");
  expect(input.value).toBe(color.name);
  screen.getByDisplayValue(color.hash);
});

describe("given there is an error", () => {
  it("should display the error message", () => {
    const errors = {
      name: "error message",
    };
    renderColorForm({ errors });
    screen.getByText("error message");
  });
});
