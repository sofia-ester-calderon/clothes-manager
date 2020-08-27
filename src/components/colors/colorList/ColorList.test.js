import React from "react";
import { render, screen } from "@testing-library/react";

import ColorList from "./ColorList";

const mockColors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
];

function renderColorList(args) {
  const defaultProps = {
    colors: mockColors,
    onClick: jest.fn(),
    onAddColor: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<ColorList {...props} />);
}

describe("given the page is laoded", () => {
  it("should render all colors in list", () => {
    renderColorList();

    screen.getByText("Red");
    screen.getByText("Green");
  });

  it("should not show Add button as default", () => {
    renderColorList();

    expect(screen.queryByText("Add New Color")).not.toBeInTheDocument();
  });
});

describe("given showButton param is passed", () => {
  it("should not display button if param false", () => {
    renderColorList({ showButton: false });

    expect(screen.queryByText("Add New Color")).not.toBeInTheDocument();
  });

  it("should display button if param true", () => {
    renderColorList({ showButton: true });

    screen.getByText("Add New Color");
  });
});
