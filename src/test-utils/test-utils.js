import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import optionsReducer from "../store/reducers/optionsReducer";

const initialState = {
  colors: [
    { id: "def_col_1", name: "Red", hash: "#ff1100" },
    { id: "def_col_2", name: "Green", hash: "#00a80b" },
    { id: "def_col_3", name: "Blue", hash: "#0019bf" },
    { id: "def_col_4", name: "Yellow", hash: "#edea13" },
    { id: "def_col_5", name: "White", hash: "#ffffff" },
    { id: "def_col_6", name: "Black", hash: "#000000" },
  ],
  categories: ["Tops", "Bottoms", "Underwear", "Shoes", "Accessories"],
};

function renderWithStore(
  ui,
  { store = createStore(optionsReducer, initialState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithStore };
