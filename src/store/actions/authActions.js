import authApi from "../../api/authApi";
import { AUTHENTICATE } from "./actionTypes";

const authenticateSuccess = (token, setCredentialsInStorage) => {
  if (setCredentialsInStorage) {
    authApi.setLocalStorageItems(token);
  }
  return {
    type: AUTHENTICATE,
    email: token.email,
    userId: token.localId,
    loginSuccess: true,
  };
};

const signUp = (authDetails) => {
  return async (dispatch) => {
    try {
      const token = await authApi.signUp({
        ...authDetails,
        returnSecureToken: true,
      });

      dispatch(authenticateSuccess(token, true));
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
      dispatch(authenticateSuccess(token, true));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const autoLogin = () => {
  return async (dispatch) => {
    try {
      const userDetails = await authApi.getUserDetails();
      if (userDetails) {
        dispatch(authenticateSuccess(userDetails, false));
      }
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const authActions = { signUp, login, autoLogin };

export default authActions;
