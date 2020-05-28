import React from "react";
import { render, screen } from "@testing-library/react";
import SelectInput from "./SelectInput";

const label = "label";
const defaultOption = "default";
const option1 = "option1";
const option2 = "option2";

function renderSelectInput(args) {
  const defaultProps = {
    name: "option",
    label,
    onChange: jest.fn(),
    defaultOption,
    options: [
      { value: option1, text: option1 },
      { value: option2, text: option2 },
    ],
  };
  const props = { ...defaultProps, ...args };
  return render(<SelectInput {...props} />);
}

it("should render select with label, default value, all options and no error message", () => {
  renderSelectInput();
  screen.getByText(label);
  screen.getByDisplayValue(defaultOption);
  screen.getByText(option1);
  screen.getByText(option2);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("should render select with selected value", () => {
  renderSelectInput({ value: option1 });
  screen.getByDisplayValue(option1);
});

it("should render disabled select", () => {
  renderSelectInput({ disabled: true });
  screen.getByDisplayValue(defaultOption);
  expect(screen.getByText(defaultOption)).toBeDisabled();
});

it("should render error message", () => {
  const error = "error";
  renderSelectInput({ error });
  screen.getByText(error);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});
