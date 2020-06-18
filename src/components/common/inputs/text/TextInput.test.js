import React from "react";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

const label = "label";
const value = "value";

function renderTextInput(args) {
  const defaultProps = {
    name: "option",
    label,
    value,
    onChange: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<TextInput {...props} />);
}

it("should render select with label, value and no error message", () => {
  renderTextInput();

  screen.getByText(label);
  screen.getByDisplayValue(value);
});

it("should render error message", () => {
  const error = "error message";
  renderTextInput({ error });

  screen.getByText(error);
});
