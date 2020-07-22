import { UPDATE_COLOR, LOAD_COLORS } from "../actions/actionTypes";
import optionsReducer from "./optionsReducer";

const initialState = {
  colors: [
    { id: "1", name: "Red", hash: "#ff1100" },
    { id: "2", name: "Green", hash: "#00a80b" },
    { id: "3", name: "Blue", hash: "#0019bf" },
  ],
  categories: ["Tops", "Bottoms"],
};

describe("given an edit color action was dispatched", () => {
  it("should return the state with the updated color and all the original values of the other options", () => {
    const updatedColor = { id: "1", name: "newName", hash: "newHash" };
    const action = {
      type: UPDATE_COLOR,
      color: updatedColor,
    };
    const newState = optionsReducer(initialState, action);
    expect(newState.colors).toHaveLength(3);
    expect(newState.colors).toEqual(expect.arrayContaining([updatedColor]));
    expect(newState.categories).toEqual(initialState.categories);
  });

  it("should return initial state if the color id does not exist", () => {
    const updatedColor = { id: "wrong id", name: "newName", hash: "newHash" };
    const action = {
      type: UPDATE_COLOR,
      color: updatedColor,
    };
    const newState = optionsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

describe("given an init color action was dispatched", () => {
  it("should return the state with the new colors and all the original values of the other options", () => {
    const colors = [
      { id: "a", name: "colorA", hash: "hashA" },
      { id: "b", name: "colorB", hash: "hashB" },
    ];
    const action = {
      type: LOAD_COLORS,
      colors,
    };
    const newState = optionsReducer(initialState, action);
    expect(newState.colors).toHaveLength(2);
    expect(newState.colors).toEqual(colors);
    expect(newState.categories).toEqual(initialState.categories);
  });
});
