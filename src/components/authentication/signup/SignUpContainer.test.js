import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../../test-utils/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import SignUpContainer from "./SignUpContainer";
import authActions from "../../../store/actions/authActions";

function renderSignUpContainer(history) {
  return renderWithStore(
    <Router history={createMemoryHistory()}>
      <SignUpContainer history={history} />
    </Router>,
    false
  );
}

describe("given the page is initally loaded", () => {
  it("should display an empty sign up form", () => {
    renderSignUpContainer();

    const email = screen.getByLabelText("E-Mail").value;
    expect(email).toBe("");

    const password = screen.getByLabelText("Password").value;
    expect(password).toBe("");

    const repeatPassword = screen.getByLabelText("Repeat Password").value;
    expect(repeatPassword).toBe("");
  });
});

describe("given an email is typed", () => {
  it("should display the email in the form", () => {
    renderSignUpContainer();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "email@email.com" },
    });

    screen.getByDisplayValue("email@email.com");
  });
});

describe("given a password is typed", () => {
  it("should display the password in the form", () => {
    renderSignUpContainer();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "mypassword" },
    });

    screen.getByDisplayValue("mypassword");
  });
});

describe("given a repeat password is typed", () => {
  it("should display the repeated password in the form", () => {
    renderSignUpContainer();

    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "repeated paswd" },
    });

    screen.getByDisplayValue("repeated paswd");
  });
});

describe("given the Sign Up button is clicked", () => {
  it("should display an error message if email is empty", () => {
    renderSignUpContainer();

    fireEvent.click(screen.getByText("Sign Up"));

    screen.getByText("Please enter a valid E-Mail");
  });

  it("should display an error message if email is not valid", () => {
    renderSignUpContainer();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "noemail" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    screen.getByText("Please enter a valid E-Mail");
  });

  it("should display an error message if password is empty", () => {
    renderSignUpContainer();

    fireEvent.click(screen.getByText("Sign Up"));

    screen.getByText("Password must be at least 6 characters long");
  });

  it("should display an error message if both passwords aren't the same", () => {
    renderSignUpContainer();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "password2" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    screen.getByText("Passwords not identical");
  });

  it("should dispatch a signUp action if form is valid", () => {
    renderSignUpContainer();
    authActions.signUp = jest.fn();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Repeat Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    expect(authActions.signUp).toHaveBeenCalledWith({
      email: "email@email.com",
      password: "password",
    });
  });
});
