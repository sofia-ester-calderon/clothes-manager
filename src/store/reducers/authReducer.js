import * as actionTypes from "../actions/actionTypes";

const initialState = { userId: null, username: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return { username: action.token.email, userId: action.token.localId };
    default:
      return state;
  }
};

export default authReducer;
