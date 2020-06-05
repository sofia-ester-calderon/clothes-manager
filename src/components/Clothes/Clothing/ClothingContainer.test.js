import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForDomChange,
} from "@testing-library/react";
import ClothingContainer from "../../Clothes/Clothing/ClothingContainer";
import { Colors } from "../../../data/data";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("axios");

jest.mock("../../../api/mockApi", () => ({
  getClothing: jest.fn().mockResolvedValue({
    id: 1,
    category: "Tops",
    type: "Sweater",
    colors: ["Red"],
    rating: 5,
    occasion: "Everyday",
  }),
  saveClothing: jest.fn().mockResolvedValue({ data: "data" }),
  editClothing: jest.fn().mockRejectedValue(),
}));

function renderClothingContainer(args) {
  const defaultProps = {
    match: { params: { id: null } },
  };
  const props = { ...defaultProps, ...args };

  return render(
    <Router history={createMemoryHistory()}>
      <ClothingContainer {...props} />
    </Router>
  );
}

describe("add or edit clothing", () => {
  it("should display header 'Add New Clothing' and empty form when no id is passed", () => {
    renderClothingContainer();
    screen.getByText("Add New Piece of Clothing");
    screen.getByDisplayValue("Select Category");
    screen.getByDisplayValue("Select Type");
    screen.getByDisplayValue("Select Color");
    screen.getByDisplayValue("Select Occasion");
  });

  it("should display header 'Edit Clothing' and filled form when id is passed", async () => {
    renderClothingContainer({ match: { params: { id: 1 } } });
    await screen.findByText("Edit Clothing");
    await screen.findByDisplayValue("Tops");
    await screen.findByDisplayValue("Sweater");
    await screen.findByDisplayValue("Red");
    await screen.findByDisplayValue("Everyday");
  });
});

describe("change category and types", () => {
  it("should display types select box as disabled when no category is selected", () => {
    renderClothingContainer();
    expect(screen.getByDisplayValue("Select Type")).toBeDisabled();
  });

  it("should dislay types select box as enabled when category is selected", () => {
    const selectedType = "Tops";
    renderClothingContainer();
    fireEvent.change(screen.getByDisplayValue("Select Category"), {
      target: { value: selectedType },
    });
    expect(screen.getByDisplayValue(selectedType)).not.toBeDisabled();
  });
});

describe("change colors", () => {
  const chosenColor = Colors[0].name;
  it("should display an extra color select box with the selected color and delete button after color was selected", () => {
    renderClothingContainer();
    // Selecting a new color adds a new select box with that color as selected value
    // and changes the original select box's default value to 'Add New Color'
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor },
    });
    screen.getByDisplayValue(chosenColor);
    screen.getByAltText("Delete");
    screen.getByDisplayValue("Add New Color");
  });

  it("should only display selected color as option of the 'clothing color' select box", () => {
    const chosenColor2 = Colors[1].name;

    renderClothingContainer();
    // Selecting a new color adds a new select box with that color as selected value
    // and changes the original select box's default value to 'Add New Color'
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor },
    });
    fireEvent.change(screen.getByDisplayValue("Add New Color"), {
      target: { value: chosenColor2 },
    });

    // Selected colors will only be displayed as options in their select boxes
    // All other colors will be displayed as options in all select boxes
    Colors.forEach((color) => {
      const optionsOfColor = screen.queryAllByText(color.name);
      color.name === chosenColor || color.name === chosenColor2
        ? expect(optionsOfColor).toHaveLength(1)
        : expect(optionsOfColor).toHaveLength(3);
    });
  });

  it("should only display selected color as option of the 'clothing color' select box after changing that color", () => {
    const chosenColor2 = Colors[1].name;
    const changedColor = Colors[2].name;
    // Selecting a new color adds a new select box with that color as selected value
    // and changes the original select box's default value to 'Add New Color'
    renderClothingContainer();
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor },
    });
    fireEvent.change(screen.getByDisplayValue("Add New Color"), {
      target: { value: chosenColor2 },
    });
    // Changing a selected color
    fireEvent.change(screen.getByDisplayValue(chosenColor2), {
      target: { value: changedColor },
    });

    // Selected colors will only be displayed as options in their select boxes
    // All other colors will be displayed as options in all select boxes
    Colors.forEach((color) => {
      const optionsOfColor = screen.queryAllByText(color.name);
      color.name === chosenColor || color.name === changedColor
        ? expect(optionsOfColor).toHaveLength(1)
        : expect(optionsOfColor).toHaveLength(3);
    });
  });

  it("should not display extra color select box when delet button clicked and show all colors as option again (all colors once)", () => {
    renderClothingContainer();
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor },
    });
    fireEvent.click(screen.getByAltText("Delete"));
    expect(screen.queryByDisplayValue(chosenColor)).not.toBeInTheDocument();
    // All colors should again be displayed in the only color select box
    Colors.forEach((color) =>
      expect(screen.queryAllByText(color.name)).toHaveLength(1)
    );
  });
});

describe("saving clothing", () => {
  it("should display error messages when saving and nothing selected", () => {
    renderClothingContainer();

    fireEvent.click(screen.getByText("Save"));
    screen.getByText("Category is required");
    screen.getByText("Type is required");
    screen.getByText("Min. one color is required");
    screen.getByText("Occasion is required");
  });

  it("should disable button and set btn text to saving when post request is processed", async () => {
    renderClothingContainer({ match: { params: { id: 1 } } });

    fireEvent.change(screen.getByDisplayValue("Select Category"), {
      target: { value: "Tops" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Type"), {
      target: { value: "Sweater" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: "Red" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Occasion"), {
      target: { value: "Formal" },
    });
    fireEvent.click(screen.getByText("Save"));

    screen.getByText("Saving...");
    expect(screen.getByText("Saving...")).toBeDisabled();

    await waitForDomChange();
  });

  it("should redirect to clothes list if save successful", async () => {
    renderClothingContainer();

    // Title of the form should be displayed
    screen.getByText("Add New Piece of Clothing");

    // set all necessary params for clothing
    fireEvent.change(screen.getByDisplayValue("Select Category"), {
      target: { value: "Tops" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Type"), {
      target: { value: "Sweater" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: "Red" },
    });
    fireEvent.change(screen.getByDisplayValue("Select Occasion"), {
      target: { value: "Formal" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitForDomChange();

    // After redirect title should not be displayed anymore
    expect(
      screen.queryByText("Add New Piece of Clothing")
    ).not.toBeInTheDocument();
  });

  it("should not redirect if saving-post was unsuccessful", async () => {
    renderClothingContainer({ match: { params: { id: 1 } } });

    fireEvent.click(screen.getByText("Save"));

    await screen.findByText("Edit Clothing");
  });
});
