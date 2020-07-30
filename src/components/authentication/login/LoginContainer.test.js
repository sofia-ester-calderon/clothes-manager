import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../../test-utils/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginContainer from "./LoginContainer";
import authActions from "../../../store/actions/authActions";
import ApiErrorProvider from "../../../hooks/ApiErrorProvider";
import axios from "../../../api/axios-api";

function renderLoginContainer(history) {
  return renderWithStore(
    <Router history={createMemoryHistory()}>
      <ApiErrorProvider>
        <LoginContainer history={history} />
      </ApiErrorProvider>
    </Router>,
    false
  );
}

describe("given the page is initially loaded", () => {
  it("should display an empty form", () => {
    renderLoginContainer();

    const email = screen.getByLabelText("E-Mail").value;
    expect(email).toBe("");

    const password = screen.getByLabelText("Password").value;
    expect(password).toBe("");
  });
});

describe("given an email is typed", () => {
  it("should display the email in the form", () => {
    renderLoginContainer();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "email@email.com" },
    });

    screen.getByDisplayValue("email@email.com");
  });
});

describe("given a password is typed", () => {
  it("should display the password in the form", () => {
    renderLoginContainer();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "mypassword" },
    });

    screen.getByDisplayValue("mypassword");
  });
});

describe("given the login button is clicked", () => {
  it("should dispatch a login action", () => {
    authActions.login = jest.fn();

    renderLoginContainer();

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(authActions.login).toHaveBeenCalledWith({
      email: "email@email.com",
      password: "password",
    });
  });
});

describe("given the Create Account Button in clicked", () => {
  it("should route to Sign Up component", () => {
    const history = { push: jest.fn() };
    renderLoginContainer(history);

    fireEvent.click(screen.getByText("Create Account"));
    expect(history.push).toHaveBeenCalledWith("/signup");
  });
});
