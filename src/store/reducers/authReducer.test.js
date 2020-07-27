import authReducer from "./authReducer";
import { SIGN_UP } from "../actions/actionTypes";

describe("given a sign up action was dispatched", () => {
  it("should return the state with new user id", () => {
    const initialState = { userId: null, username: null };
    const token = {
      email: "email",
      localId: "localId",
      idToken: "idToken",
      refreshToken: "refreshToken",
    };

    const action = {
      type: SIGN_UP,
      token,
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      username: "email",
      userId: "localId",
      token: "idToken",
      refreshToken: "refreshToken",
    });
  });
});
