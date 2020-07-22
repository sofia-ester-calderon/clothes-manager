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

it("should render all colors in list", () => {
  renderColorList();

  screen.getByText("Red");
  screen.getByText("Green");
});
