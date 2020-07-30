import authApi from "../../api/authApi";
import { AUTHENTICATE, LOGOUT } from "./actionTypes";

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
      } else {
        authApi.removeLocalStorageItems();
      }
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const logout = () => {
  authApi.removeLocalStorageItems();
  return {
    type: LOGOUT,
  };
};

const authActions = { signUp, login, autoLogin, logout };

export default authActions;
