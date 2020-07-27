import authApi from "../../api/authApi";
import { SIGN_UP } from "./actionTypes";

const signUpSuccess = (token) => {
  return {
    type: SIGN_UP,
    token,
  };
};

const signUp = (authDetails) => {
  return async (dispatch) => {
    try {
      const token = await authApi.signUp({
        ...authDetails,
        returnSecureToken: true,
      });
      dispatch(signUpSuccess(token));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const authActions = { signUp };

export default authActions;
