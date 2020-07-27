import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import authApi from "../../api/authApi";
import authActions from "./authActions";
import { SIGN_UP } from "./actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("given a new account is created", () => {
  it("should dispatch signUpSuccess action if api call was successful", () => {
    const signUpDetails = {
      email: "email@email.com",
      password: "password",
    };

    const postRequestToApi = {
      email: "email@email.com",
      password: "password",
      returnSecureToken: true,
    };

    const responseFromApi = {
      token: "token",
    };

    authApi.signUp = jest.fn().mockResolvedValue(responseFromApi);

    const store = mockStore({});
    return store.dispatch(authActions.signUp(signUpDetails)).then(() => {
      expect(authApi.signUp).toHaveBeenCalledWith(postRequestToApi);
      expect(store.getActions()).toEqual([
        { type: SIGN_UP, token: responseFromApi },
      ]);
    });
  });

  it("should not dispatch any action if api call was unsuccessful", () => {
    authApi.signUp = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(authActions.signUp()).then(() => {
      expect(authApi.signUp).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
