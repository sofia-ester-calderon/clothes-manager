import * as actionTypes from "../actions";

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

const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_COLOR:
      const colors = state.colors.map((color) =>
        color.id === action.color.id ? action.color : color
      );
      return { ...state, colors };
    default:
      return state;
  }
};

export default optionsReducer;
