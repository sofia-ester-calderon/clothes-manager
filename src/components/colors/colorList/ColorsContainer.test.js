import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { renderWithStore } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";

import ColorsContainer from "./ColorsContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

const url = "/url";

async function renderColorsContainer(emptyState, history) {
  const defaultProps = { match: { url }, history };
  renderWithStore(
    <Router history={createMemoryHistory()}>
      <ColorsContainer {...defaultProps} />
    </Router>,
    emptyState
  );
  if (!emptyState) {
    await screen.findByText("Red");
  }
}

describe("given the page is loaded", () => {
  it("should load colors if color list is empty", async () => {
    optionsActions.loadColors = jest.fn();
    await renderColorsContainer(true);

    expect(optionsActions.loadColors).toHaveBeenCalled();
  });

  it("should display the colors list", async () => {
    await renderColorsContainer();

    screen.getByText("Red");
    screen.getByText("Green");
  });
});

describe("given a color is clicked", () => {
  it("should route to the color details form", async () => {
    const history = { push: jest.fn() };
    await renderColorsContainer(false, history);

    fireEvent.click(screen.getByText("Red"));
    expect(history.push).toHaveBeenCalledWith(url + "/def_col_1");
  });
});

describe("given the Add New Color btn is clicked", () => {
  it("should route to the new color form", async () => {
    const history = { push: jest.fn() };

    await renderColorsContainer(false, history);

    fireEvent.click(screen.getByText("Add New Color"));
    expect(history.push).toHaveBeenCalledWith(url + "/new");
  });
});
