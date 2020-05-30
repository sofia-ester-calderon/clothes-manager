import React from "react";
import { render, screen } from "@testing-library/react";
import ClothesGroupedList from "./ClothesGroupedList";
import { TOPS, Colors } from "../../../data/data";

const header = "header";
const clothes = [
  {
    id: 1,
    category: TOPS,
    type: "typ2",
    colors: [Colors[0].name, Colors[1].name, Colors[2].name, Colors[3].name],
    rating: 1,
    occasion: "occasion",
  },
];

function renderClothesGroupedList(args) {
  const defaultProps = {
    header,
    clothes,
    display: true,
    onClickHeader: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<ClothesGroupedList {...props} />);
}

it("should render the header with clothes length", () => {
  renderClothesGroupedList();
  screen.getByText(header + " (1)");
});

it("should only render header if clothes empty", () => {
  renderClothesGroupedList({ clothes: [] });
  screen.getByText(header);
});

it("should display all clothes and up-arrow if display is true", () => {
  renderClothesGroupedList();
  screen.getByAltText("Collapse");
  clothes.forEach((clothing) => {
    screen.getByText(clothing.type);
    screen.getByText(clothing.occasion);
    expect(screen.queryAllByTestId("circle-color")).toHaveLength(
      clothing.colors.length
    );
  });
});

it("should display down-arrow and no clothes if display is false", () => {
  renderClothesGroupedList({ display: false });
  screen.getByAltText("Show");
  clothes.forEach((clothing) => {
    expect(screen.queryByText(clothing.type)).not.toBeInTheDocument();
    expect(screen.queryByText(clothing.occasion)).not.toBeInTheDocument();
    expect(screen.queryByTestId("circle-color")).not.toBeInTheDocument();
  });
});

it("should not display any arrow if no clothes are displayed", () => {
  renderClothesGroupedList({ clothes: [] });
  expect(screen.queryByAltText("Show")).not.toBeInTheDocument();
  expect(screen.queryByAltText("Collapse")).not.toBeInTheDocument();
});
