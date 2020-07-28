import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  username: null,
  token: null,
  refreshToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return {
        username: action.email,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
