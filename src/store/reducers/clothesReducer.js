import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const clothesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CLOTHES:
      return [...action.clothes];
    case actionTypes.DELETE_CLOTHING:
      return state.filter((clothing) => clothing.id !== action.clothingId);
    default:
      return state;
  }
};

export default clothesReducer;
