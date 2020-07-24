import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import AuthenticationForm from "./AuthenticationForm";

function renderAuthenticationForm(args) {
  const defaultProps = {
    authDetails: { email: "", passsword: "" },
    onChange: jest.fn(),
    onSignUp: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<AuthenticationForm {...props} />);
}

describe("given auth details are passed as params", () => {
  it("should display the email", () => {
    const authDetails = {
      email: "entered email",
      password: "",
    };
    renderAuthenticationForm({ authDetails });

    screen.getByDisplayValue("entered email");
  });

  it("should display the password not in plain text", () => {
    const authDetails = {
      email: "",
      password: "enteredpswd",
    };
    renderAuthenticationForm({ authDetails });

    const pswdField = screen.getByDisplayValue("enteredpswd");

    expect(pswdField.getAttribute("type")).toBe("password");
  });

  it("should display the reapeat password not in plain text", () => {
    const authDetails = {
      email: "",
      password: "enteredpswd",
      repeatPassword: "repeatpswd",
    };
    renderAuthenticationForm({ authDetails });

    const pswdField = screen.getByDisplayValue("repeatpswd");

    expect(pswdField.getAttribute("type")).toBe("password");
  });
});

describe("given an error is passed", () => {
  it("should display the email error message", () => {
    const errors = {
      email: "email error message",
    };
    renderAuthenticationForm({ errors });

    screen.getByText("email error message");
  });

  it("should display the password error message", () => {
    const errors = {
      password: "password error message",
    };
    renderAuthenticationForm({ errors });

    screen.getByText("password error message");
  });

  it("should display the repeat password error message", () => {
    const errors = {
      repeatPassword: "repeat password error message",
    };
    renderAuthenticationForm({ errors });

    screen.getByText("repeat password error message");
  });
});
