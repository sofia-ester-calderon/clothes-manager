import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { renderWithStore } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";

import ColorDetailContainer from "./ColorDetailContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

async function renderDetailContainer(param, history) {
  const props = {
    match: { params: { id: param } },
    history,
  };
  renderWithStore(<ColorDetailContainer {...props} />);

  if (param !== "new") {
    await screen.findByDisplayValue("Red");
  }
}

describe("given the page is initially loaded", () => {
  it("should display the filled out form if a colorId is passed as param", async () => {
    await renderDetailContainer("def_col_1");
    screen.getByDisplayValue("Red");
    screen.getByDisplayValue("#FF1100");
  });

  it("should display an empty form with black color if 'new' is passed as param", async () => {
    await renderDetailContainer("new");
    const text = screen.getByLabelText("Name").value;
    expect(text).toBe("");
    screen.getByDisplayValue("#000000");
  });

  it("should display title Edit if colorId is passed as param", async () => {
    await renderDetailContainer("def_col_1");
    screen.getByText("Edit");
  });

  it("should display title New Color if 'new' is passed as param", async () => {
    await renderDetailContainer("new");
    screen.getByText("New Color");
  });
});

describe("given the name of the color is changed", () => {
  it("should render the new color name", async () => {
    await renderDetailContainer("def_col_1");
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    screen.getByDisplayValue("Blue");
  });
});

describe("given the cancel button was clicked", () => {
  it("should route to color list", async () => {
    const history = { push: jest.fn() };
    await renderDetailContainer("def_col_1", history);
    fireEvent.click(screen.getByText("Cancel"));
    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});

describe("given the save button was clicked", () => {
  it("should display error message if color name is empty and not call api", async () => {
    await renderDetailContainer("def_col_1");
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Save"));
    screen.getByText("Name is required");
  });

  it("should dispatch an updateColor action if color was edited", async () => {
    const history = createMemoryHistory();
    optionsActions.updateColor = jest.fn();

    await renderDetailContainer("def_col_1", history);
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(optionsActions.updateColor).toHaveBeenCalledWith({
      id: "def_col_1",
      name: "Blue",
      hash: "#ff1100",
    });
  });

  it("should route to color list if save was successful", async () => {
    const history = { push: jest.fn() };

    await renderDetailContainer("def_col_1", history);
    fireEvent.click(screen.getByText("Save"));

    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});
