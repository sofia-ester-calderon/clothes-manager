import React from "react";
import { render, screen } from "@testing-library/react";
import ApiErrorProvider from "../../hooks/ApiErrorProvider";
import withApiErrorHandler from "./withApiErrorHandler";
import axios from "../../api/axios-clothes";

axios.get = jest.fn().mockResolvedValue();

// jest.mock("../../api/axios-clothes", () => ({
//   get: () => jest.fn().mockResolvedValue(),
//   interceptors: {
//     request: {
//       use: () => console.log("MOCK IMP"),
//     },
//     response: {
//       use: () => jest.fn().mockResolvedValue({ message: "message" }),
//     },
//   },
// }));

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

it("should not render any modal", () => {
  renderWithApiErrorHandler();
  expect(screen.queryByText("Please try again later!")).not.toBeInTheDocument();
});

it("should render modal when api error was thrown", () => {
  axios.interceptors.response.use = jest.fn((successCb, failCb) => {
    failCb({
      response: {
        status: 401,
      },
      message: "error message",
    });
  });
  //   try {
  renderWithApiErrorHandler();
  //   } catch (err) {
  //     console.log("caught error", err);
  //   }

  screen.getByText("Please try again later!");
});
