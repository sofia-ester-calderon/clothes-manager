import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { renderWithStore, initStates } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";

import ColorDetailContainer from "./ColorDetailContainer";
import ApiErrorProvider from "../../../hooks/ApiErrorProvider";

HTMLCanvasElement.prototype.getContext = jest.fn();

async function renderDetailContainer(param, history, stateType) {
  const props = {
    match: { params: { id: param } },
    history,
  };
  renderWithStore(
    <ApiErrorProvider>
      <ColorDetailContainer {...props} />
    </ApiErrorProvider>,
    stateType
  );

  if (param === "def_col_2") {
    await screen.findByDisplayValue("Green");
  } else if (param !== "new") {
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
    screen.getByText("Color Details");
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

  it("should display error message if user is not logged in and not call api", async () => {
    await renderDetailContainer("new", null, initStates.EMPTY_STATE_LOGGED_OUT);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Blue" },
    });

    fireEvent.click(screen.getByText("Save"));
    screen.getByText("You must be logged in for this function");
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
      userId: "userId",
    });
  });

  it("should dispatch a saveColor action if new color is saved", async () => {
    const history = createMemoryHistory();
    optionsActions.saveColor = jest.fn();

    await renderDetailContainer("new", history);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(optionsActions.saveColor).toHaveBeenCalledWith(
      {
        name: "Blue",
        hash: "#000000",
      },
      "userId"
    );
  });

  it("should route to color list if save was successful", async () => {
    const history = { push: jest.fn() };

    await renderDetailContainer("def_col_1", history);
    fireEvent.click(screen.getByText("Save"));

    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});
