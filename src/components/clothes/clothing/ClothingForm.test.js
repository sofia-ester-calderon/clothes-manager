import React from "react";
import { render, screen } from "@testing-library/react";
import ClothingForm from "../clothing/ClothingForm";
import { emptyClothing, Categories, Occasion, Types } from "../../../data/data";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

const allColors = [
  { id: "def_col_1", name: "Red", hash: "#ff1100" },
  { id: "def_col_2", name: "Green", hash: "#00a80b" },
  { id: "def_col_3", name: "Blue", hash: "#0019bf" },
];

function renderClothingForm(args) {
  const defaultProps = {
    clothing: emptyClothing,
    onSave: jest.fn(),
    errors: {},
    onChange: jest.fn(),
    types: [],
    colors: allColors,
    onRemoveColor: jest.fn(),
    onChangeColor: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <AllColorsContext.Provider value={allColors}>
      <ClothingForm {...props} />
    </AllColorsContext.Provider>
  );
}

describe("form with empty clothing and types as param", () => {
  it("should display category select box with all categories as option and have default value selected", () => {
    renderClothingForm();
    screen.getByText("Category");
    screen.getByDisplayValue("Select Category");
    Categories.forEach((category) => {
      screen.getByText(category);
    });
  });

  it("should display type select box with default value to be selected and disabled", () => {
    renderClothingForm();
    screen.getByText("Type");
    expect(screen.getByDisplayValue("Select Type")).toBeDisabled();
  });

  it("should display single color select box with option default value to be 'Select Color'", () => {
    renderClothingForm();
    screen.getByText("Color");
    screen.getByDisplayValue("Select Color");
    Categories.forEach((color) => {
      screen.getByText(color);
    });
  });

  it("should display occasion select box with all occasions as option and have default value selected", () => {
    renderClothingForm();
    screen.getByText("Occasion");
    screen.getByDisplayValue("Select Occasion");
    Occasion.forEach((occasion) => {
      screen.getByText(occasion);
    });
  });
});

describe("form with clothing and types as param", () => {
  const clothing = {
    id: 2,
    category: "Tops",
    type: "T-Shirt",
    colors: ["def_col_1", "def_col_2"],
    rating: 4,
    occasion: "Sport",
  };
  const types = Types;

  it("should display category of clothing as selected", () => {
    renderClothingForm({ clothing, types });
    screen.getByDisplayValue(clothing.category);
  });

  it("should display type of clothing as selected and all types as options", () => {
    renderClothingForm({ clothing, types });
    screen.getByDisplayValue(clothing.type);
    types.forEach((type) => screen.getByText(type.name));
  });

  it("should display select boxes of all clothing colors with each color as selected", () => {
    renderClothingForm({ clothing, types });
    screen.getByText("Color");
    screen.getByDisplayValue("Red");
    screen.getByDisplayValue("Green");
  });

  it("should display single select box with 'Add Color' as selected value", () => {
    renderClothingForm({ clothing, types });
    screen.getByDisplayValue("Add New Color");
  });

  it("should display occasion of clothing as selected", () => {
    renderClothingForm({ clothing, types });
    screen.getByDisplayValue(clothing.occasion);
  });
});

describe("form with error messages", () => {
  const categoryError = "category error";
  const typeError = "type error";
  const colorError = "color error";
  const occasionError = "occasion error";
  const errors = {
    category: categoryError,
    type: typeError,
    colors: colorError,
    occasion: occasionError,
  };

  it("should display all error messages", () => {
    renderClothingForm({ errors });
    screen.getByText(categoryError);
    screen.getByText(typeError);
    screen.getByText(colorError);
    screen.getByText(occasionError);
  });
});
