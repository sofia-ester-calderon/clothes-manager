import * as actionTypes from "../actions/actionTypes";

const initialState = {
  colors: [],
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
};

const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_COLOR:
      const updatedColors = state.colors.map((color) =>
        color.id === action.color.id ? action.color : color
      );
      return { ...state, colors: updatedColors };
    case actionTypes.LOAD_COLORS:
      return {
        ...state,
        colors: action.colors,
      };
    case actionTypes.SAVE_COLOR:
      const newColors = [...state.colors, { ...action.color }];
      return { ...state, colors: newColors };

    default:
      return state;
  }
};

export default optionsReducer;
