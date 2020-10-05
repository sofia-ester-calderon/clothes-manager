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

describe("given a value and label is passed", () => {
  it("should render input field with the label, and value", () => {
    renderTextInput();

    screen.getByText(label);
    screen.getByDisplayValue(value);
  });
});

describe("given an error message is passed", () => {
  it("should render the message", () => {
    const error = "error message";
    renderTextInput({ error });

    screen.getByText(error);
  });
});

describe("given type password is passed", () => {
  it("should render the value as password", () => {
    const type = "password";
    renderTextInput({ type });

    const inputField = screen.getByDisplayValue(value);

    expect(inputField.getAttribute("type")).toBe("password");
  });
});

describe("given no type is passed", () => {
  it("should render the value as text", () => {
    renderTextInput();

    const inputField = screen.getByDisplayValue(value);

    expect(inputField.getAttribute("type")).toBe("text");
  });
});

describe("given disabled true is passed", () => {
  it("should render the input as disabled", () => {
    renderTextInput({ disabled: true });
    expect(screen.getByDisplayValue(value)).toBeDisabled();
  });
});

describe("given no disabled value is passed", () => {
  it("should render the input as enabled", () => {
    renderTextInput();
    expect(screen.getByDisplayValue(value)).not.toBeDisabled();
  });
});
