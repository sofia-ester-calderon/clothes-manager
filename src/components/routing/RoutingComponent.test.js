import React from "react";
import { screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { renderWithStore } from "../../test-utils/test-utils";

import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import RoutingComponent from "./RoutingComponent";

jest.mock("../../api/clothesApi", () => ({
  getClothes: jest.fn().mockResolvedValue([]),
}));

function renderRoutingComponent(history) {
  renderWithStore(
    <Router history={history}>
      <ApiErrorProvider>
        <RoutingComponent />
      </ApiErrorProvider>
    </Router>
  );
}

describe("given app is rendered for the first time", () => {
  it("should render home page", () => {
    const history = createMemoryHistory();
    renderRoutingComponent(history);
    screen.getByText("Get Your Closet Organised");
  });
});

describe("given a new url is passed", () => {
  it("should render AllClothes if path is /clothes", async () => {
    const history = createMemoryHistory();
    const route = "/clothes";
    history.push(route);
    renderRoutingComponent(history);
    await screen.findByText("All My Clothes");
  });

  it("should render Login if path is /login", async () => {
    const history = createMemoryHistory();
    const route = "/login";
    history.push(route);
    renderRoutingComponent(history);
    await screen.findByText("Login Details");
  });

  it("should render SignUp if path is /signup", async () => {
    const history = createMemoryHistory();
    const route = "/signup";
    history.push(route);
    renderRoutingComponent(history);
    await screen.findByText("Create an Account");
  });

  it("should redirect directly to home page if path is /logout", async () => {
    const history = createMemoryHistory();
    const route = "/logout";
    history.push(route);
    renderRoutingComponent(history);
    await screen.findByText("Get Your Closet Organised");
  });

  it("should render NotFoundPage if path is wrong", () => {
    const history = createMemoryHistory();
    const route = "/bad-route";
    history.push(route);
    renderRoutingComponent(history);
    screen.getByText("Page Not Found");
  });
});
