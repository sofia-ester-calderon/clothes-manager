import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { renderWithStore } from "../../../test-utils/test-utils";

import ColorsContainer from "./ColorsContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

const history = { push: jest.fn() };
const url = "/url";

async function renderColorsContainer(args) {
  const defaultProps = { match: { url }, history };
  const props = { ...defaultProps, ...args };
  renderWithStore(
    <Router history={createMemoryHistory()}>
      <ColorsContainer {...props} />
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
  expect(history.push).toHaveBeenCalledWith(url + "/def_col_1");
});
