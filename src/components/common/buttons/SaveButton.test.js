import React from "react";
import { render, screen } from "@testing-library/react";
import SaveButton from "./SaveButton";

function renderSaveButton(props) {
  return render(<SaveButton {...props} />);
}

it("should render Save and be enabled as default mode", () => {
  renderSaveButton();

  screen.getByText("Save");
  expect(screen.getByText("Save")).toBeEnabled();
});

it("should render Saving... and be disabled when saving is true", () => {
  renderSaveButton({ saving: true });

  screen.getByText("Saving...");
  expect(screen.getByText("Saving...")).toBeDisabled();
});
