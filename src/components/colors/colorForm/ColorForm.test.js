import React from "react";
import { render, screen } from "@testing-library/react";
import ColorForm from "./ColorForm";

const color = { id: "def_col_1", name: "Red", hash: "#FF1100", userId: "id" };

HTMLCanvasElement.prototype.getContext = jest.fn();

function renderColorForm(args) {
  const defaultProps = {
    color,
    onChangeColor: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
    onDelete: jest.fn(),
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorForm {...props} />);
}

describe("given the color doesnt have an id", () => {
  it("should render New Color as title", () => {
    const color = { name: "Red", hash: "#FF1100" };

    renderColorForm({ color });

    screen.getByText("New Color");
  });

  it("should render the save button", () => {
    const color = { name: "Red", hash: "#FF1100" };

    renderColorForm({ color });

    screen.getByText("Save");
  });

  it("should render input field as enabled", () => {
    const color = { name: "Red", hash: "#FF1100" };

    renderColorForm({ color });

    expect(screen.getByDisplayValue("Red")).not.toBeDisabled();
  });

  it("should not render delete button", () => {
    const color = { name: "Red", hash: "#FF1100" };

    renderColorForm({ color });

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });
});

describe("given the color has an id", () => {
  it("should render Color Details header as title if color has an id", () => {
    renderColorForm();

    screen.getByText("Color Details");
  });

  it("should render the color name and hex", () => {
    renderColorForm();

    const input = screen.getByLabelText("Name");
    expect(input.value).toBe(color.name);
    screen.getByDisplayValue(color.hash);
  });

  describe("given the color is editable", () => {
    it("should not render not editable flag", () => {
      renderColorForm();

      expect(
        screen.queryByText("Public colors cannot be edited")
      ).not.toBeInTheDocument();
    });

    it("should render the save button", () => {
      renderColorForm();

      screen.getByText("Save");
    });

    it("should render input field as enabled", () => {
      const color = { name: "Red", hash: "#FF1100" };

      renderColorForm({ color });

      expect(screen.getByDisplayValue("Red")).not.toBeDisabled();
    });

    it("should render delete button", () => {
      renderColorForm();

      screen.getByText("Delete");
    });
  });

  describe("given the color is not editable", () => {
    it("should render not editable flag ", () => {
      const color = { name: "Red", hash: "#FF1100", userId: "all" };

      renderColorForm({ color });

      screen.getByText("Public colors cannot be edited");
    });

    it("should not render the save button", () => {
      const color = { name: "Red", hash: "#FF1100", userId: "all" };

      renderColorForm({ color });

      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });

    it("should disable the input field", () => {
      const color = { name: "Red", hash: "#FF1100", userId: "all" };

      renderColorForm({ color });

      expect(screen.getByDisplayValue("Red")).toBeDisabled();
    });

    it("should not render delete button", () => {
      const color = { name: "Red", hash: "#FF1100" };

      renderColorForm({ color });

      expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });
  });
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
