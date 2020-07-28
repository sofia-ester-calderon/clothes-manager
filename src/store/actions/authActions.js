import authApi from "../../api/authApi";
import { AUTHENTICATE } from "./actionTypes";

const authenticateSuccess = (token) => {
  authApi.setLocalStorageItems(token);
  return {
    type: AUTHENTICATE,
    email: token.email,
    userId: token.localId,
  };
};

const signUp = (authDetails) => {
  return async (dispatch) => {
    try {
      const token = await authApi.signUp({
        ...authDetails,
        returnSecureToken: true,
      });
      console.log(token);

      dispatch(authenticateSuccess(token));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const login = (authDetails) => {
  return async (dispatch) => {
    try {
      const token = await authApi.login({
        ...authDetails,
        returnSecureToken: true,
      });
      console.log(token);
      dispatch(authenticateSuccess(token));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const authActions = { signUp, login };

export default authActions;
