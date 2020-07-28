import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import authApi from "../../api/authApi";
import authActions from "./authActions";
import { AUTHENTICATE } from "./actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

beforeEach(() => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
});

describe("given a new account is created", () => {
  it("should dispatch signUpSuccess action if api call was successful and store the results in the local storage", () => {
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
      email: "email@email.com",
      localId: "userId",
      idToken: "current-token",
      refreshToken: "refresh-token",
      expiresIn: 3600,
    };

    authApi.signUp = jest.fn().mockResolvedValue(responseFromApi);

    const store = mockStore({});
    return store.dispatch(authActions.signUp(signUpDetails)).then(() => {
      expect(authApi.signUp).toHaveBeenCalledWith(postRequestToApi);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "token",
        "current-token"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "refreshToken",
        "refresh-token"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "expirationDate",
        expect.any(Date)
      );
      expect(store.getActions()).toEqual([
        { type: AUTHENTICATE, email: "email@email.com", userId: "userId" },
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

describe("given a login is dispatched", () => {
  it("should dispatch loginSuccess action if api call was successful and store the results in the local storage", () => {
    const loginDetails = {
      email: "login@email.com",
      password: "loginPassword",
    };

    const postRequestToApi = {
      email: "login@email.com",
      password: "loginPassword",
      returnSecureToken: true,
    };

    const responseFromApi = {
      email: "login@email.com",
      localId: "loginUserId",
      idToken: "login-token",
      refreshToken: "login-refresh-token",
      expiresIn: 3600,
    };

    authApi.login = jest.fn().mockResolvedValue(responseFromApi);

    const store = mockStore({});
    return store.dispatch(authActions.login(loginDetails)).then(() => {
      expect(authApi.login).toHaveBeenCalledWith(postRequestToApi);
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "login-token");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "refreshToken",
        "login-refresh-token"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "expirationDate",
        expect.any(Date)
      );
      expect(store.getActions()).toEqual([
        { type: AUTHENTICATE, email: "login@email.com", userId: "loginUserId" },
      ]);
    });
  });

  it("should not dispatch any action if api call was unsuccessful", () => {
    authApi.login = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(authActions.login()).then(() => {
      expect(authApi.login).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
