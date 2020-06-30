import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AllClothesContainer from "../../Clothes/ClothesList/AllClothesContainer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockClothes = [
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
];

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
    colors: ["Red"],
    rating: 5,
    occasion: "Everyday",
  }),
  deleteClothing: jest.fn().mockResolvedValue(),
}));

beforeAll(() => {});

async function renderAllClothesContainer() {
  render(
    <Router history={createMemoryHistory()}>
      <AllClothesContainer />
    </Router>
  );
  await screen.findByText("Tops (2)");
}

describe("first rendering", () => {
  it("should only display clothes of group TOPS", async () => {
    await renderAllClothesContainer();
    screen.getByText("Sweater");
    screen.getByText("T-Shirt");
    expect(screen.queryByText("Jeans")).not.toBeInTheDocument();
  });
});

describe("toggle visibility", () => {
  it("should display clothes of group if collapsed group clicked", async () => {
    await renderAllClothesContainer();
    fireEvent.click(screen.getByText("Bottoms (1)"));
    mockClothes.forEach((clothing) => {
      screen.getByText(clothing.type);
    });
  });

  it("should not display clothes of group if displayed group is clicked", async () => {
    await renderAllClothesContainer();
    fireEvent.click(screen.getByText("Tops (2)"));
    mockClothes.forEach((clothing) =>
      expect(screen.queryByText(clothing.type)).not.toBeInTheDocument()
    );
  });

  it("should only display clothes of the filtered color", async () => {
    await renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Colors"), {
      target: { value: "def_col_2" },
    });
    mockClothes.forEach((clothing) => {
      clothing.colors.includes("def_col_2")
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered occasion", async () => {
    await renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Occasions"), {
      target: { value: "Sport" },
    });
    mockClothes.forEach((clothing) => {
      clothing.occasion === "Sport"
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered rating", async () => {
    await renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Ratings"), {
      target: { value: "4" },
    });
    mockClothes.forEach((clothing) => {
      clothing.rating === 4
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });
});

describe("edit and delete", () => {
  it("should not display an item after deleting", async () => {
    const clothingToDelete = mockClothes[0];
    await renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Delete")[0]);
    expect(screen.queryByText(clothingToDelete.type)).not.toBeInTheDocument();
  });

  it("should route to clothing form if edit is clicked", async () => {
    await renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Edit")[0]);
    screen.findByText("Edit Clothing");
  });
});
