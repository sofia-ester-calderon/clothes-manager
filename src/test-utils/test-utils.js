import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import optionsReducer from "../store/reducers/optionsReducer";

const FILLED_STATE = "FILLED_STATE";
const EMPTY_STATE_LOGGED_OUT = "EMPTY_STATE_LOGGED_OUT";
const EMPTY_STATE_LOGGED_IN = "EMPTY_STATE_LOGGED_IN";

export const initStates = {
  FILLED_STATE,
  EMPTY_STATE_LOGGED_IN,
  EMPTY_STATE_LOGGED_OUT,
};

const initialStateFilled = {
  options: {
    colors: [
      { id: "def_col_1", name: "Red", hash: "#ff1100" },
      { id: "def_col_2", name: "Green", hash: "#00a80b" },
      { id: "def_col_3", name: "Blue", hash: "#0019bf" },
      { id: "def_col_4", name: "Yellow", hash: "#edea13" },
      { id: "def_col_5", name: "White", hash: "#ffffff" },
      { id: "def_col_6", name: "Black", hash: "#000000" },
    ],
    categories: ["Tops", "Bottoms", "Underwear", "Shoes", "Accessories"],
    occasions: ["Sport", "Formal", "Everyday"],
    types: [
      { id: 1, name: "Sweater", category: "Tops" },
      { id: 2, name: "T-Shirt", category: "Tops" },
      { id: 3, name: "Jeans", category: "Bottoms" },
      { id: 4, name: "Leggings", category: "Bottoms" },
      { id: 5, name: "Bra", category: "Underwear" },
      { id: 6, name: "Socks", category: "Underwear" },
      { id: 7, name: "Boots", category: "Shoes" },
      { id: 8, name: "Sneakers", category: "Shoes" },
      { id: 9, name: "Earrings", category: "Accessories" },
      { id: 10, name: "Scarf", category: "Accessories" },
    ],
    seasons: ["Spring", "Summer", "Autumn", "Winter"],
  },
  clothes: [
    {
      id: 1,
      category: "Tops",
      type: "Sweater",
      colors: ["def_col_1"],
      rating: 5,
      occasion: "Everyday",
      seasons: ["Winter"],
    },
    {
      id: 2,
      category: "Tops",
      type: "T-Shirt",
      colors: ["def_col_2"],
      rating: 4,
      occasion: "Sport",
      seasons: ["Spring"],
    },
    {
      id: 3,
      category: "Bottoms",
      type: "Jeans",
      colors: ["def_col_3"],
      rating: 2,
      occasion: "Everyday",
      seasons: ["Summer"],
    },
  ],
  auth: {
    userId: "userId",
    username: "email",
  },
};

const initialStateEmpty = {
  options: {
    colors: [],
    categories: [],
    occasions: [],
    types: [],
    seasons: [],
  },
  clothes: [],
  auth: {
    userId: null,
    username: null,
  },
};

const initialStateEmptyLoggedIn = {
  options: {
    colors: [],
    categories: [],
    occasions: [],
    types: [],
    seasons: [],
  },
  clothes: [],
  auth: {
    userId: "userId",
    username: "email",
  },
};

function getInitState(initState) {
  switch (initState) {
    case FILLED_STATE:
      return initialStateFilled;
    case EMPTY_STATE_LOGGED_OUT:
      return initialStateEmpty;
    case EMPTY_STATE_LOGGED_IN:
      return initialStateEmptyLoggedIn;
    default:
      return initialStateFilled;
  }
}

function renderWithStore(
  ui,
  stateType,
  {
    store = createStore(optionsReducer, getInitState(stateType)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    store.dispatch = jest.fn();
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithStore };
