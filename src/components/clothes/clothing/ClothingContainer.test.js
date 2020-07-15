import React from "react";
import { screen, fireEvent, waitForDomChange } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { renderWithStore } from "../../../test-utils/test-utils";
import clothesApi from "../../../api/clothesApi";
import optionsActions from "../../../store/actions/optionsActions";

import ClothingContainer from "../../clothes/clothing/ClothingContainer";

jest.mock("axios");

clothesApi.getClothing = jest.fn().mockResolvedValue({
  id: 1,
  category: "Tops",
  type: "Sweater",
  colors: ["def_col_1"],
  rating: 5,
  occasion: "Everyday",
});

clothesApi.saveClothing = jest.fn().mockResolvedValue({ data: "data" });

clothesApi.editClothing = jest.fn().mockRejectedValue();

function renderClothingContainer(args, emptyState) {
  const defaultProps = {
    match: { params: { id: null } },
  };
  const props = { ...defaultProps, ...args };

  return renderWithStore(
    <Router history={createMemoryHistory()}>
      <ClothingContainer {...props} />
    </Router>,
    emptyState
  );
}

describe("initial loading", () => {
  it("should load colors if color list is empty", async () => {
    optionsActions.initColors = jest.fn();
    renderClothingContainer(null, true);

    expect(optionsActions.initColors).toHaveBeenCalled();
  });
});

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
  const chosenColor = { id: "def_col_1", name: "Red" };
  it("should display an extra color select box with the selected color and delete button after color was selected", () => {
    renderClothingContainer();
    // Selecting a new color adds a new select box with that color as selected value
    // and changes the original select box's default value to 'Add New Color'
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor.id },
    });
    screen.getByDisplayValue(chosenColor.name);
    screen.getByAltText("Delete");
    screen.getByDisplayValue("Add New Color");
  });

  it("should only display the two selected colors as option of the 'clothing color' select box", () => {
    const secondChosenColor = { id: "def_col_2", name: "Green" };

    renderClothingContainer();
    // Selecting a new color adds a new select box with that color as selected value
    // and changes the original select box's default value to 'Add New Color'
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor.id },
    });
    fireEvent.change(screen.getByDisplayValue("Add New Color"), {
      target: { value: secondChosenColor.id },
    });

    // Red is a selected color, so it should only be present as option in one select box
    // The one where it is the display value
    const optionsOfColorRed = screen.queryAllByText("Red");
    expect(optionsOfColorRed).toHaveLength(1);

    // Green is a selected color, so it should only be present as option in one select box
    // The one where it is the display value
    const optionsOfColorGreen = screen.queryAllByText("Green");
    expect(optionsOfColorGreen).toHaveLength(1);

    // Blue isn't a selected color, so it should be present as option in all 3 select boxes
    const optionsOfColorBlue = screen.queryAllByText("Blue");
    expect(optionsOfColorBlue).toHaveLength(3);

    // Yellow isn't a selected color, so it should be present as option in all 3 select boxes
    const optionsOfColorYellow = screen.queryAllByText("Yellow");
    expect(optionsOfColorYellow).toHaveLength(3);
  });

  it("should only display selected color as option of the 'clothing color' select box after changing that color", () => {
    const changedColor = { id: "def_col_3", name: "Blue" };

    renderClothingContainer();
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor.id },
    });

    // Change a selected color
    fireEvent.change(screen.getByDisplayValue(chosenColor.name), {
      target: { value: changedColor.id },
    });

    // Blue is a selected color, so it should only be present as option in one select box
    // The one where it is the display value
    const optionsOfColorBlue = screen.queryAllByText("Blue");
    expect(optionsOfColorBlue).toHaveLength(1);

    // Red isn't a selected color, so it should be present as option in all 2 select boxes
    const optionsOfColorRed = screen.queryAllByText("Red");
    expect(optionsOfColorRed).toHaveLength(2);
  });

  it("should not display extra color select box when delet button clicked and show all colors as option again (all colors once)", () => {
    renderClothingContainer();
    fireEvent.change(screen.getByDisplayValue("Select Color"), {
      target: { value: chosenColor.id },
    });
    fireEvent.click(screen.getByAltText("Delete"));
    expect(
      screen.queryByDisplayValue(chosenColor.name)
    ).not.toBeInTheDocument();

    // Red isn't a selected color, so it should be present as option in the select box
    const optionsOfColorRed = screen.queryAllByText("Red");
    expect(optionsOfColorRed).toHaveLength(1);
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
      target: { value: "def_col_1" },
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
    await screen.findByText("Select Color");

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
      target: { value: "def_col_1" },
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
