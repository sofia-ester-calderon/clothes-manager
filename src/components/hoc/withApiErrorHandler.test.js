import React from "react";
import { render, screen } from "@testing-library/react";
import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import withApiErrorHandler from "./withApiErrorHandler";
import axios from "../../api/axios-clothes";

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

it("should not render any modal on initial load", () => {
  renderWithApiErrorHandler();
  expect(screen.queryByText("Please try again later!")).not.toBeInTheDocument();
});

it("should render modal with spinner when request was fired", () => {
  axios.interceptors.request.use = jest.fn((successCb, failCb) => {
    successCb();
  });

  renderWithApiErrorHandler();
  screen.getByText("Loading...");
});

it("should render modal with error message when api response error was thrown", () => {
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

it("should not render modal when no api response error was thrown", () => {
  axios.interceptors.response.use = jest.fn((successCb, failCb) => {
    successCb({
      response: {
        status: 200,
      },
    });
  });
  renderWithApiErrorHandler();

  expect(screen.queryByText("Please try again later!")).not.toBeInTheDocument();
});
