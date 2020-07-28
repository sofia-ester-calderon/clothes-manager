import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  username: null,
  token: null,
  refreshToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return {
        username: action.email,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
