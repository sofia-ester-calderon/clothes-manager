import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { wait } from "react-testing-library";

import { renderWithStore, mockStore } from "../../../test-utils/test-utils";

import ColorDetailContainer from "./ColorDetailContainer";
import { editColor } from "../../../store/actions/optionsActions";

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

    await renderDetailContainer(history);
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      editColor({ id: "def_col_1", name: "Blue", hash: "#ff1100" })
    );
  });

  it("should route to color list if save was successful", async () => {
    const history = createMemoryHistory();

    await renderDetailContainer(history);
    fireEvent.click(screen.getByText("Save"));

    wait(() => expect(history.push).toHaveBeenCalledWith("/colors"));
  });
});
