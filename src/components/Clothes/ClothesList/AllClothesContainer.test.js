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
    fireEvent.click(screen.getByText(secondGroup));
    clothesData.forEach((clothing) => {
      clothing.category === firstGroup || clothing.category === secondGroup
        ? screen.getByText(clothing.type)
        : expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    });
  });

  it("should not display clothes of group if displayed group is clicked", () => {
    renderAllClothesContainer();
    fireEvent.click(screen.getByText(firstGroup));
    clothesData.forEach((clothing) =>
      expect(screen.queryByText(clothing.type)).not.toBeInTheDocument()
    );
  });
});
