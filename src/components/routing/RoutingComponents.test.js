import React from "react";
import { render, screen } from "@testing-library/react";
import RoutingComponent from "./RoutingComponent";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ApiErrorProvider from "../../hooks/ApiErrorProvider";

jest.mock("../../api/clothesApi", () => ({
  getClothes: jest.fn().mockResolvedValue([]),
}));

function renderRoutingComponent(history) {
  render(
    <Router history={history}>
      <ApiErrorProvider
        value={{
          errorMessage: null,
          loading: false,
        }}
      >
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

  it("should render NotFoundPage if path is wrong", () => {
    const history = createMemoryHistory();
    const route = "/bad-route";
    history.push(route);
    renderRoutingComponent(history);
    screen.getByText("Page Not Found");
  });
});
