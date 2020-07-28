import authReducer from "./authReducer";
import { AUTHENTICATE } from "../actions/actionTypes";

describe("given a sign up action was dispatched", () => {
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
