import React from "react";
import { screen, fireEvent, wait } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import clothesApi from "../../../api/clothesApi";
import { renderWithStore, initStates } from "../../../test-utils/test-utils";
import optionsActions from "../../../store/actions/optionsActions";
import clothesActions from "../../../store/actions/clothesActions";

import AllClothesContainer from "./AllClothesContainer";
import ApiErrorProvider from "../../../hooks/ApiErrorProvider";

clothesApi.getClothing = jest.fn().mockResolvedValue({
  id: 1,
  category: "Tops",
  type: "Sweater",
  colors: [],
  rating: 5,
  occasion: "Everyday",
});

jest.mock("../../../api/colorsApi", () => ({
  getColors: jest.fn().mockResolvedValue([
    { id: "def_col_1", name: "Red", hash: "#ff1100" },
    { id: "def_col_2", name: "Green", hash: "#00a80b" },
    { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  ]),
}));

async function renderAllClothesContainer(history, stateType) {
  const props = {
    history,
  };
  renderWithStore(
    <Router history={createMemoryHistory()}>
      <ApiErrorProvider>
        <AllClothesContainer {...props} />
      </ApiErrorProvider>
    </Router>,
    stateType
  );
  if (!stateType || stateType === initStates.FILLED_STATE) {
    // Await for everything to be rendered accordingly
    await screen.findByText("Total: 3");
  } else {
    await screen.findByText("Total: 0");
  }
}

describe("given the page is opened", () => {
  it("should load colors if color list is empty", async () => {
    optionsActions.loadColors = jest.fn();
    await renderAllClothesContainer(null, initStates.EMPTY_STATE_LOGGED_OUT);
    expect(optionsActions.loadColors).toHaveBeenCalled();
  });

  it("should load colors if user logged in and only public colors present", async () => {
    optionsActions.loadColors = jest.fn();
    await renderAllClothesContainer(null, initStates.PUBLIC_STATE_LOGGED_IN);

    expect(optionsActions.loadColors).toHaveBeenCalledWith("userId");
  });

  it("should not load colors if user logged in and user colors present", async () => {
    optionsActions.loadColors = jest.fn();
    await renderAllClothesContainer(null, initStates.FILLED_STATE);

    expect(optionsActions.loadColors).not.toHaveBeenCalled();
  });

  it("should load clothes if clothes list is empty", async () => {
    clothesActions.loadClothes = jest.fn();
    await renderAllClothesContainer(null, initStates.EMPTY_STATE_LOGGED_IN);
    expect(clothesActions.loadClothes).toHaveBeenCalledWith("userId");
  });

  it("should not load clothes if clothes list is not empty", async () => {
    clothesActions.loadClothes = jest.fn();
    await renderAllClothesContainer(null, initStates.FILLED_STATE);
    expect(clothesActions.loadClothes).not.toHaveBeenCalled();
  });

  it("should only display clothes of type 'Tops' - all others are hidden", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    expect(screen.queryByText("Jeans")).not.toBeInTheDocument();
  });
});

describe("given the visibility toggle icon is clicked", () => {
  it("should display clothes of that type if they were hidden before", async () => {
    await renderAllClothesContainer();
    expect(screen.queryByText("Jeans")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Bottoms (1)"));
    screen.getByText("Jeans");
  });

  it("should not display clothes of that type if the were displayed before", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    fireEvent.click(screen.getByText("Tops (2)"));
    expect(screen.queryByText("Sweater")).not.toBeInTheDocument();
    expect(screen.queryByText("T-Shirt")).not.toBeInTheDocument();
  });
});

describe("given a filter is selected", () => {
  it("should only display clothes of the selected color", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    fireEvent.change(screen.getByDisplayValue("All Colors"), {
      target: { value: "def_col_2" },
    });
    expect(screen.queryByText("Sweater")).not.toBeInTheDocument();
    screen.getByText("T-Shirt");
  });

  it("should only display clothes of the selected occasion", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    fireEvent.change(screen.getByDisplayValue("All Occasions"), {
      target: { value: "Sport" },
    });
    expect(screen.queryByText("Sweater")).not.toBeInTheDocument();
    screen.getByText("T-Shirt");
  });

  it("should only display clothes of the selected rating", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    fireEvent.change(screen.getByDisplayValue("All Ratings"), {
      target: { value: "5" },
    });
    screen.getByText("Sweater");
    expect(screen.queryByText("T-Shirt")).not.toBeInTheDocument();
  });

  it("should only display clothes of the selected season", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    fireEvent.change(screen.getByDisplayValue("All Seasons"), {
      target: { value: "Spring" },
    });
    screen.getByText("T-Shirt");
    expect(screen.queryByText("Sweater")).not.toBeInTheDocument();
  });
});

describe("given the delete button of a clothing item is clicked", () => {
  it("should dispatch a deleteClothing action", async () => {
    clothesActions.deleteClothing = jest.fn();
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    fireEvent.click(screen.getAllByAltText("Delete")[0]);
    expect(clothesActions.deleteClothing).toHaveBeenCalledWith(1);
  });
});

describe("given the edit button of a clothing item is clicked", () => {
  it("should route to edit clothing page - not display this container anymore", async () => {
    const history = { push: jest.fn() };
    await renderAllClothesContainer(history);
    fireEvent.click(screen.getAllByAltText("Edit")[0]);

    wait(() => expect(screen.queryByText("Tops (2)")).not.toBeInTheDocument());
  });
});
