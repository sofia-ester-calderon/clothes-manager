import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ColorsContainer from "./ColorsContainer";
import { AllColorsContext } from "../../hooks/AllColorsProvider";

HTMLCanvasElement.prototype.getContext = jest.fn();

const history = { push: jest.fn() };
const url = "/url";

const mockedColors = [
  { id: "abc", name: "Red", hash: "#ff1100" },
  { id: "def", name: "Green", hash: "#00a80b" },
];

jest.mock("../../api/colorsApi", () => ({
  getColors: jest.fn().mockResolvedValue([
    { id: "abc", name: "Red", hash: "#ff1100" },
    { id: "def", name: "Green", hash: "#00a80b" },
  ]),
}));

async function renderColorsContainer(args) {
  const defaultProps = { match: { url }, history };
  const props = { ...defaultProps, ...args };
  render(
    <Router history={createMemoryHistory()}>
      <AllColorsContext.Provider value={mockedColors}>
        <ColorsContainer {...props} />
      </AllColorsContext.Provider>
    </Router>
  );
  await screen.findByText("Red");
}

it("should display the colors list", async () => {
  await renderColorsContainer();

  screen.getByText("Red");
  screen.getByText("Green");
});

it("should route to the color details when color is clicked", async () => {
  await renderColorsContainer();

  fireEvent.click(screen.getByText("Red"));
  expect(history.push).toHaveBeenCalledWith(url + "/abc");
});
