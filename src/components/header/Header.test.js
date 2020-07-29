import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../test-utils/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import App from "../App";

function renderHeader(loggedOut) {
  const history = createMemoryHistory();
  return renderWithStore(
    <ApiErrorProvider>
      <Router history={history}>
        <App />
      </Router>
    </ApiErrorProvider>,
    loggedOut
  );
}

describe("given the user is logged in", () => {
  it("should not display the login button", () => {
    renderHeader(false);

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("should display the logout button", () => {
    renderHeader(false);

    screen.getByText("Logout");
  });
});

describe("given the user is not logged in", () => {
  it("should display the login button", () => {
    renderHeader(true);

    screen.getByText("Login");
  });

  it("should not display the logout button", () => {
    renderHeader(true);

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});

describe("given the Home button is clicked", () => {
  it("should route to Home component", () => {
    renderHeader();

    fireEvent.click(screen.getByText("Home"));

    screen.getByText("Get Your Closet Organised");
  });
});

describe("given the Add Clothing button is clicked", () => {
  it("should route to Clothing component", () => {
    renderHeader();

    fireEvent.click(screen.getByText("Add Clothing"));

    screen.getByText("Add New Clothing Item");
  });
});

describe("given the All Clothes button is clicked", () => {
  it("should route to ClothesList component", () => {
    renderHeader();

    fireEvent.click(screen.getByText("All Clothes"));

    screen.getByText("All My Clothes");
  });
});

describe("given the Colors button is clicked", () => {
  it("should route to Color component", () => {
    renderHeader();

    fireEvent.click(screen.getByText("Colors"));

    screen.getByText("Manage Colors");
  });
});

describe("given the Login button is clicked", () => {
  it("should route to Authentication component", () => {
    renderHeader(true);

    fireEvent.click(screen.getByText("Login"));

    screen.getByText("Login Details");
  });
});
