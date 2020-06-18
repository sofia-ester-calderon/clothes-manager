import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ColorsContainer from "./ColorsContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

const history = { push: jest.fn() };
const url = "/url";

function renderColorsContainer(args) {
  const defaultProps = { match: { url }, history };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={createMemoryHistory()}>
      <ColorsContainer {...props} />
    </Router>
  );
}

it("should display the colors list", () => {
  renderColorsContainer();

  screen.getByText("Red");
  screen.getByText("Green");
});

it("should route to the color details when color is clicked", () => {
  const colorName = "Red";
  renderColorsContainer();

  fireEvent.click(screen.getByText(colorName));
  expect(history.push).toHaveBeenCalledWith(url + "/" + colorName);
});
