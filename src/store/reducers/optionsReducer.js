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
