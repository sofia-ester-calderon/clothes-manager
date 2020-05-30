import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AllClothesContainer from "../../Clothes/ClothesList/AllClothesContainer";
import { clothesData, Categories } from "../../../data/data";

const firstGroup = Categories[0];

function renderAllClothesContainer() {
  return render(<AllClothesContainer />);
}

describe("first rendering", () => {
  it("should only display clothes of group TOPS", () => {
    renderAllClothesContainer();
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });
});

describe("toggle visibility", () => {
  it("should display clothes of group if collapsed group clicked", () => {
    const secondGroup = Categories[1];

    renderAllClothesContainer();
    fireEvent.click(screen.getByText(secondGroup + " (2)"));
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup || clothing.category === secondGroup
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should not display clothes of group if displayed group is clicked", () => {
    renderAllClothesContainer();
    fireEvent.click(screen.getByText(firstGroup + " (2)"));
    clothesData.forEach((clothing) =>
      expect(screen.queryByText(clothing.type)).not.toBeInTheDocument()
    );
  });

  it("should only display clothes of the filtered color", () => {
    renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Colors"), {
      target: { value: "Green" },
    });
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup && clothing.colors.includes("Green")
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered occasion", () => {
    renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Occasions"), {
      target: { value: "Sport" },
    });
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup && clothing.occasion === "Sport"
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should only display clothes of the filtered rating", () => {
    renderAllClothesContainer();
    fireEvent.change(screen.getByDisplayValue("All Ratings"), {
      target: { value: "4" },
    });
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup && clothing.rating === 4
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });
});

describe("edit and delete", () => {
  it("should not display an item after deleting", () => {
    const clothingToDelete = clothesData[0];
    renderAllClothesContainer();
    fireEvent.click(screen.getAllByAltText("Delete")[0]);
    expect(screen.queryByText(clothingToDelete.type)).not.toBeInTheDocument();
  });
});
