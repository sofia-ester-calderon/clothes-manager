import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { renderWithStore } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";

import ColorDetailContainer from "./ColorDetailContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

async function renderDetailContainer(history) {
  const props = {
    match: { params: { id: "def_col_1" } },
    history,
    color: { id: "def_col_1", name: "Red", hash: "#ff1100" },
  };
  renderWithStore(<ColorDetailContainer {...props} />);
  await screen.findByDisplayValue("Red");
}

describe("given the name of the color is changed", () => {
  it("should render the new color name", async () => {
    await renderDetailContainer();
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    screen.getByDisplayValue("Blue");
  });
});

describe("given the cancel button was clicked", () => {
  it("should route to color list", async () => {
    const history = { push: jest.fn() };
    await renderDetailContainer(history);
    fireEvent.click(screen.getByText("Cancel"));
    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});

describe("given the save button was clicked", () => {
  it("should display error message if color name is empty and not call api", async () => {
    await renderDetailContainer();
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Save"));
    screen.getByText("Name is required");
  });

  it("should dispatch an edit color action with the new color information", async () => {
    const history = createMemoryHistory();
    optionsActions.editColor = jest.fn();

    await renderDetailContainer(history);
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(optionsActions.editColor).toHaveBeenCalledWith({
      id: "def_col_1",
      name: "Blue",
      hash: "#ff1100",
    });
  });

  it("should route to color list if save was successful", async () => {
    const history = { push: jest.fn() };

    await renderDetailContainer(history);
    fireEvent.click(screen.getByText("Save"));

    expect(history.push).toHaveBeenCalledWith("/colors")

  });
});
