import React from "react";
import { render, screen } from "@testing-library/react";
import RatingInput from "./RatingInput";

it("should display rating and no error message", () => {
  const onChange = jest.fn();
  render(<RatingInput onChange={onChange} rating={5} />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("should display rating and error message", () => {
  const onChange = jest.fn();
  const error = "error message";
  render(<RatingInput onChange={onChange} rating={5} error={error} />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
  screen.getByText(error);
});
