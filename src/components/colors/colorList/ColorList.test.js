import React from "react";
import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

const mockColors = [
  { name: "Red", hash: "#ff1100" },
  { name: "Green", hash: "#00a80b" },
];

function renderColorList(args) {
  const defaultProps = {
    colors: mockColors,
    onClick: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <AllColorsContext.Provider value={mockColors}>
      <ColorList {...props} />
    </AllColorsContext.Provider>
  );
}

it("should render all colors in list", () => {
  renderColorList();

  screen.getByText("Red");
  screen.getByText("Green");
});
