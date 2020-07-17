import { LOAD_CLOTHES } from "../actions/actionTypes";
import clothesReducer from "./clothesReducer";

const initialState = [];

describe("given a load color action was dispatched", () => {
  it("should return the state with new clothes", () => {
    const clothes = [
      {
        id: 1,
        category: "Tops",
        type: "type",
        colors: ["1", "2"],
        rating: 1,
        occasion: "occasion",
      },
    ];

    const action = {
      type: LOAD_CLOTHES,
      clothes,
    };

    const newState = clothesReducer(initialState, action);
    expect(newState).toEqual(clothes);
  });
});
