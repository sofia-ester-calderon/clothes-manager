import authApi from "../../api/authApi";
import { SIGN_UP } from "./actionTypes";

const signUpSuccess = (token) => {
  authApi.setLocalStorageItems(token);
  return {
    type: SIGN_UP,
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

      dispatch(signUpSuccess(token));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const authActions = { signUp };

export default authActions;
