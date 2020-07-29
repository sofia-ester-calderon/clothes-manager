import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  username: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return {
        username: action.email,
        userId: action.userId,
      };
    case actionTypes.LOGOUT:
      return {
        username: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
