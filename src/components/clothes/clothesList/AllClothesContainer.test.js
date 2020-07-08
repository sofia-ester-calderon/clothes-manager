import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../../App";

jest.mock("../../../api/clothesApi", () => ({
  getClothes: jest.fn().mockResolvedValue([
    {
      id: 1,
      category: "Tops",
      type: "Sweater",
      colors: ["def_col_1"],
      rating: 5,
      occasion: "Everyday",
    },
    {
      id: 2,
      category: "Tops",
      type: "T-Shirt",
      colors: ["def_col_2"],
      rating: 4,
      occasion: "Sport",
    },
    {
      id: 3,
      category: "Bottoms",
      type: "Jeans",
      colors: ["def_col_3"],
      rating: 2,
      occasion: "Everyday",
    },
  ]),
  getClothing: jest.fn().mockResolvedValue({
    id: 1,
    category: "Tops",
    type: "Sweater",
    colors: [],
    rating: 5,
    occasion: "Everyday",
  }),
  deleteClothing: jest.fn().mockResolvedValue(),
}));

jest.mock("../../../api/colorsApi", () => ({
  getColors: jest.fn().mockResolvedValue([
    { id: "def_col_1", name: "Red", hash: "#ff1100" },
    { id: "def_col_2", name: "Green", hash: "#00a80b" },
    { id: "def_col_3", name: "Blue", hash: "#0019bf" },
  ]),
}));

async function renderAllClothesContainer() {
  render(
    <Router history={createMemoryHistory()}>
      <App />
    </Router>
  );
  fireEvent.click(screen.getByText("All Clothes"));
  // Await for everything to be rendered accordingly
  await screen.findByText("Tops (2)");
}

describe("given the page is opened", () => {
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
});

describe("given the delete button of a clothing item is clicked", () => {
  it("should not display that item", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    fireEvent.click(screen.getAllByAltText("Delete")[0]);
    expect(screen.queryByText("Sweater")).not.toBeInTheDocument();
  });
});

describe("given the edit button of a clothing item is clicked", () => {
  it("should route to edit clothing page", async () => {
    await renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Edit")[0]);
    await screen.findByText("Edit Clothing");
  });
});
