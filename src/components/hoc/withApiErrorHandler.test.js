import React from "react";
import { render, screen } from "@testing-library/react";
import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import withApiErrorHandler from "./withApiErrorHandler";
import axios from "../../api/axios-api";

axios.get = jest.fn().mockResolvedValue();

const DummyComponent = () => {
  axios.get("/wrongsomething.hgbtf");
  return <div>Dummy Component</div>;
};

const WrappedDummyComponent = withApiErrorHandler(DummyComponent);

function renderWithApiErrorHandler() {
  return render(
    <ApiErrorProvider>
      <WrappedDummyComponent />
    </ApiErrorProvider>
  );
}

describe("given no request was fired or response received", () => {
  it("should not render any modal", () => {
    renderWithApiErrorHandler();
    expect(
      screen.queryByText("Please try again later!")
    ).not.toBeInTheDocument();
  });
});

describe("given a request was fired", () => {
  it("should render modal with spinner for get requests", () => {
    axios.interceptors.request.use = jest.fn((successCb, failCb) => {
      successCb({ method: "get" });
    });

    renderWithApiErrorHandler();
    screen.getByText("Loading...");
  });

  it("should render modal with spinner for put requests", () => {
    axios.interceptors.request.use = jest.fn((successCb, failCb) => {
      successCb({ method: "put" });
    });

    renderWithApiErrorHandler();
    screen.getByText("Loading...");
  });

  it("should render modal with spinner for post requests", () => {
    axios.interceptors.request.use = jest.fn((successCb, failCb) => {
      successCb({ method: "post" });
    });

    renderWithApiErrorHandler();
    screen.getByText("Loading...");
  });
});

describe("given a response was received", () => {
  it("should render modal with error message if response throws an error", () => {
    const errorMessage = "error message";
    axios.interceptors.response.use = jest.fn((successCb, failCb) => {
      failCb({
        response: {
          status: 401,
        },
        message: errorMessage,
      });
    });

    expect(() => {
      renderWithApiErrorHandler().toThrow();
      screen.getByText("Please try again later!");
      screen.getByText(`Ooooops, there was an error: ${errorMessage}`);
    });
  });

  it("should not render any modal if response was no errors", () => {
    axios.interceptors.response.use = jest.fn((successCb, failCb) => {
      successCb({
        config: {
          method: "get",
        },
      });
    });
    renderWithApiErrorHandler();

    expect(
      screen.queryByText("Please try again later!")
    ).not.toBeInTheDocument();
  });
});
