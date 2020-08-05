import React from "react";
import { renderWithStore } from "../../../test-utils/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ApiErrorProvider from "../../../hooks/ApiErrorProvider";
import LogutComponent from "./LogutComponent";
import authActions from "../../../store/actions/authActions";

function renderLogoutContainer(history) {
  return renderWithStore(
    <Router history={createMemoryHistory()}>
      <ApiErrorProvider>
        <LogutComponent history={history} />
      </ApiErrorProvider>
    </Router>,
    null
  );
}

describe("given the component is loaded", () => {
  it("should redirect to home page", () => {
    const history = { push: jest.fn() };
    renderLogoutContainer(history);

    expect(history.push).toHaveBeenCalledWith("/");
  });

  it("should dispatch a logout action", () => {
    const history = { push: jest.fn() };

    authActions.logout = jest.fn();
    renderLogoutContainer(history);

    expect(authActions.logout).toHaveBeenCalled();
  });
});
