import authReducer from "./authReducer";
import { AUTHENTICATE, LOGOUT } from "../actions/actionTypes";

describe("given an authenitcate action was dispatched", () => {
  it("should return the state with new user id", () => {
    const initialState = { userId: null, username: null };

    const action = {
      type: AUTHENTICATE,
      email: "email",
      userId: "userId",
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      username: "email",
      userId: "userId",
    });
  });
});

describe("given a logout action was dispatched", () => {
  it("should return the state empty", () => {
    const initialState = { userId: "userid", username: "email" };

    const action = {
      type: LOGOUT,
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      username: null,
      userId: null,
    });
  });
});
