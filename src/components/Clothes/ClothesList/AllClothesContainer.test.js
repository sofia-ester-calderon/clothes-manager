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
    colors: ["Red"],
    rating: 5,
    occasion: "Everyday",
  },
  {
    id: 2,
    category: "Tops",
    type: "T-Shirt",
    colors: ["Green"],
    rating: 4,
    occasion: "Sport",
  },
  {
    id: 3,
    category: "Bottoms",
    type: "Jeans",
    colors: ["Blue"],
    rating: 2,
    occasion: "Everyday",
  },
];

jest.mock("../../../api/mockApi", () => ({
  getClothes: () => mockClothes,
}));

function renderAllClothesContainer() {
  return render(
    <Router history={createMemoryHistory()}>
      <AllClothesContainer />
    </Router>
  );
}

describe("first rendering", () => {
  it("should only display clothes of group TOPS", () => {
    renderAllClothesContainer();
    mockClothes.forEach((clothing) => {
      clothing.category === "Tops"
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });
});

describe("toggle visibility", () => {
  it("should display clothes of group if collapsed group clicked", () => {
    renderAllClothesContainer();
    fireEvent.click(screen.getByText("Bottoms (1)"));
    mockClothes.forEach((clothing) => {
      screen.getByText(clothing.type);
    });
  });

  it("should not display clothes of group if displayed group is clicked", () => {
    renderAllClothesContainer();
    fireEvent.click(screen.getByText("Tops (2)"));
    mockClothes.forEach((clothing) =>
      expect(screen.queryByText(clothing.type)).not.toBeInTheDocument()
    );
  });

  it("should only display clothes of the filtered color", () => {
    renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Colors"), {
      target: { value: "Green" },
    });
    mockClothes.forEach((clothing) => {
      clothing.colors.includes("Green")
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered occasion", () => {
    renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Occasions"), {
      target: { value: "Sport" },
    });
    mockClothes.forEach((clothing) => {
      clothing.occasion === "Sport"
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered rating", () => {
    renderAllClothesContainer();
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
  it("should not display an item after deleting", () => {
    const clothingToDelete = mockClothes[0];
    renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Delete")[0]);
    expect(screen.queryByText(clothingToDelete.type)).not.toBeInTheDocument();
  });

  it("should route to clothing form if edit is clicked", async () => {
    renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Edit")[0]);
    screen.findByText("Edit Clothing");
  });
});
