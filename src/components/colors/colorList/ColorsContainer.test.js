import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { renderWithStore, initStates } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";

import ColorsContainer from "./ColorsContainer";
import ApiErrorProvider from "../../../hooks/ApiErrorProvider";

HTMLCanvasElement.prototype.getContext = jest.fn();

const url = "/url";

async function renderColorsContainer(history, stateType) {
  const defaultProps = { match: { url }, history };
  renderWithStore(
    <Router history={createMemoryHistory()}>
      <ApiErrorProvider>
        <ColorsContainer {...defaultProps} />
      </ApiErrorProvider>
    </Router>,
    stateType
  );
  if (!stateType) {
    await screen.findByText("Red");
  }
}

describe("given the page is loaded", () => {
  it("should load colors if color list is empty", async () => {
    optionsActions.loadColors = jest.fn();
    await renderColorsContainer(null, initStates.EMPTY_STATE_LOGGED_OUT);

    expect(optionsActions.loadColors).toHaveBeenCalledWith(null);
  });

  it("should load colors if user logged in and only public colors present", async () => {
    optionsActions.loadColors = jest.fn();
    await renderColorsContainer(null, initStates.PUBLIC_STATE_LOGGED_IN);

    expect(optionsActions.loadColors).toHaveBeenCalledWith("userId");
  });

  it("should not load colors if user logged in and user colors present", async () => {
    optionsActions.loadColors = jest.fn();
    await renderColorsContainer(null, initStates.FILLED_STATE);

    expect(optionsActions.loadColors).not.toHaveBeenCalled();
  });

  it("should display the colors list", async () => {
    await renderColorsContainer();

    screen.getByText("Red");
    screen.getByText("Green");
  });

  it("should not display Add New Color button if user is not logged in", async () => {
    await renderColorsContainer(null, initStates.EMPTY_STATE_LOGGED_OUT);

    expect(screen.queryByText("Add New Color")).not.toBeInTheDocument();
  });

  it("should display Add New Color button if user is logged in", async () => {
    await renderColorsContainer(null, initStates.FILLED_STATE);

    screen.getByText("Add New Color");
  });
});

describe("given a color is clicked", () => {
  it("should route to the color details form", async () => {
    const history = { push: jest.fn() };
    await renderColorsContainer(history);

    fireEvent.click(screen.getByText("Red"));
    expect(history.push).toHaveBeenCalledWith(url + "/def_col_1");
  });
});

describe("given the Add New Color btn is clicked", () => {
  it("should route to the new color form", async () => {
    const history = { push: jest.fn() };

    await renderColorsContainer(history);

    fireEvent.click(screen.getByText("Add New Color"));
    expect(history.push).toHaveBeenCalledWith(url + "/new");
  });
});
