import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "./NotFound";

const history = { push: jest.fn() };

function renderNotFoundPage() {
  const props = {
    history,
  };
  render(<NotFound {...props} />);
}

describe("given the go to home page is clicked", () => {
  it("should redirect to the home page", () => {
    renderNotFoundPage();
    fireEvent.click(screen.getByText("Go to Home"));
    expect(history.push).toHaveBeenCalledWith("/");
  });
});
