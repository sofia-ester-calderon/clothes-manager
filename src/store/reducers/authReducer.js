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
      console.log(action.token);
      return {
        username: action.token.email,
        userId: action.token.localId,
        token: action.token.idToken,
        refreshToken: action.token.refreshToken,
      };
    default:
      return state;
  }
};

export default authReducer;
