import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const clothesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CLOTHES:
      return [...action.clothes];
    default:
      return state;
  }
};

export default clothesReducer;
