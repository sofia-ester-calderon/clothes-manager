import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ColorDetailContainer from "./ColorDetailContainer";

HTMLCanvasElement.prototype.getContext = jest.fn();

const history = { push: jest.fn() };

jest.mock("../../../api/colorsApi", () => ({
  getColor: jest
    .fn()
    .mockResolvedValue({ id: "abc", name: "Red", hash: "#ff1100" }),
}));

async function renderDetailContainer(args) {
  const defaultProps = {
    match: { params: { id: "Red" } },
    history,
  };
  const props = { ...defaultProps, ...args };
  render(<ColorDetailContainer {...props} />);
  await screen.findByDisplayValue("Red");
}

describe("display and edit color", () => {
  it("should display the given color", async () => {
    await renderDetailContainer();

    screen.getByDisplayValue("Red");
    screen.getByDisplayValue("#FF1100");
  });

  it("should change the name of the color", async () => {
    await renderDetailContainer();
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });

    screen.getByDisplayValue("Blue");
  });
});

describe("cancel", () => {
  it("should not display component anymore when cancelled", async () => {
    await renderDetailContainer();
    screen.getByDisplayValue("Red");
    fireEvent.click(screen.getByText("Cancel"));
    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});
