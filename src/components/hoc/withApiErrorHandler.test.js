import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import withApiErrorHandler from "./withApiErrorHandler";
import axios from "../../api/axios-api";

axios.get = jest.fn().mockResolvedValue();

const DummyComponent = () => {
  axios.get("/wrongsomething.hgbtf");
  return <div>Dummy Component</div>;
};

const WrappedDummyComponent = withApiErrorHandler(DummyComponent);

function renderWithApiErrorHandler(history) {
  return render(
    <ApiErrorProvider>
      <WrappedDummyComponent history={history} />
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
  it("should render modal with error message if response throws a generic error", () => {
    const errorMessage = "error message";
    axios.interceptors.response.use = jest.fn((successCb, failCb) => {
      failCb({
        response: {
          status: 401,
          statusText: errorMessage,
          data: {},
        },
      });
    });

    renderWithApiErrorHandler();

    screen.getByText("Ooooops, there was an error! Please try again later");
    screen.getByText(errorMessage);
  });

  it("should render modal with error message if response throws an authentication error and redirect to login page", () => {
    const history = { push: jest.fn() };
    const errorMessage = "error message";
    axios.interceptors.response.use = jest.fn((successCb, failCb) => {
      failCb({
        response: {
          status: 401,
          statusText: "",
          data: { error: { message: errorMessage } },
        },
      });
    });

    renderWithApiErrorHandler(history);

    screen.getByText("Your session has expired!");
    screen.getByText(`Please login again`);
    screen.getByText(errorMessage);

    fireEvent.click(screen.getByText("Login"));
    expect(history.push).toHaveBeenCalledWith("/login");
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
