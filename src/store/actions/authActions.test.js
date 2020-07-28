import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import authApi from "../../api/authApi";
import authActions from "./authActions";
import { SIGN_UP } from "./actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

beforeEach(() => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
});

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
      email: "email@email.com",
      localId: 'userId',
      idToken: 'current-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600
    };

    authApi.signUp = jest.fn().mockResolvedValue(responseFromApi);

    const store = mockStore({});
    return store.dispatch(authActions.signUp(signUpDetails)).then(() => {
      expect(authApi.signUp).toHaveBeenCalledWith(postRequestToApi);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'current-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('expirationDate', expect.any(Date));
      expect(store.getActions()).toEqual([
        { type: SIGN_UP, email: 'email@email.com', userId: "userId" },
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
