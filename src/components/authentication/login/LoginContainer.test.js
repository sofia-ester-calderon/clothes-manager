import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../../test-utils/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginContainer from "./LoginContainer";

function renderLoginContainer(history) {
  return renderWithStore(
    <Router history={createMemoryHistory()}>
      <LoginContainer history={history} />
    </Router>,
    false
  );
}

describe("given the Create Account Button in clicked", () => {
  it("should route to Sign Up component", () => {
    const history = { push: jest.fn() };
    renderLoginContainer(history);

    fireEvent.click(screen.getByText("Create Account"));
    expect(history.push).toHaveBeenCalledWith("/signup");
  });
});
