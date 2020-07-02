import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ColorDetailContainer from "./ColorDetailContainer";
import colorApi from "../../../api/colorsApi";
import { createMemoryHistory } from "history";
import { wait } from "react-testing-library";

HTMLCanvasElement.prototype.getContext = jest.fn();

colorApi.getColor = jest
  .fn()
  .mockResolvedValue({ id: "abc", name: "Red", hash: "#ff1100" });

async function renderDetailContainer(history) {
  const props = {
    match: { params: { id: "Red" } },
    history,
  };
  render(<ColorDetailContainer {...props} />);
  await screen.findByDisplayValue("Red");
}

describe("given the page is rendered", () => {
  it("should display the color name and hash", async () => {
    await renderDetailContainer();
    screen.getByDisplayValue("Red");
    screen.getByDisplayValue("#FF1100");
  });
});

describe("given the name of the color is changed", () => {
  it("should render the new color name", async () => {
    await renderDetailContainer();
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    screen.getByDisplayValue("Blue");
  });
});

describe("given the cancel button was clicked", () => {
  it("should route to color list", async () => {
    const history = { push: jest.fn() };
    await renderDetailContainer(history);
    fireEvent.click(screen.getByText("Cancel"));
    expect(history.push).toHaveBeenCalledWith("/colors");
  });
});

describe("given the save button was clicked", () => {
  it("should display error message if color name is empty and not call api", async () => {
    colorApi.editColor = jest.fn().mockResolvedValue();

    await renderDetailContainer();
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Save"));
    screen.getByText("Name is required");
    expect(colorApi.editColor).toHaveBeenCalledTimes(0);
  });

  it("should call the update api with the current color", async () => {
    const history = { push: jest.fn() };
    colorApi.editColor = jest.fn().mockResolvedValue();

    await renderDetailContainer(history);
    fireEvent.change(screen.getByDisplayValue("Red"), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(colorApi.editColor).toHaveBeenCalledWith({
      id: "abc",
      name: "Blue",
      hash: "#ff1100",
    });
  });

  it("should route to color list if save was successful", async () => {
    const history = createMemoryHistory();
    colorApi.editColor = jest.fn().mockResolvedValue();

    await renderDetailContainer(history);
    fireEvent.click(screen.getByText("Save"));

    wait(() => expect(history.push).toHaveBeenCalledWith("/colors"));
  });
});
