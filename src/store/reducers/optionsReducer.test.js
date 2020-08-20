import { UPDATE_COLOR, LOAD_COLORS, SAVE_COLOR } from "../actions/actionTypes";
import optionsReducer from "./optionsReducer";

const initialState = {
  colors: [
    { id: "1", name: "Red", hash: "#ff1100" },
    { id: "2", name: "Green", hash: "#00a80b" },
    { id: "3", name: "Blue", hash: "#0019bf" },
  ],
  categories: ["Tops", "Bottoms"],
};

describe("given an update color action was dispatched", () => {
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

describe("given an load color action was dispatched", () => {
  describe("given the user is not logged in", () => {
    const publicColors = [
      { id: "a", name: "colorA", hash: "hashA", userId: "all" },
      { id: "c", name: "colorC", hash: "hashC", userId: "all" },
    ];
    const userColor1 = [
      { id: "b", name: "colorB", hash: "hashB", userId: "id1" },
    ];
    const userColor2 = [
      { id: "d", name: "colorD", hash: "hashD", userId: "id2" },
    ];

    const colors = publicColors.concat(userColor1, userColor2);

    it("should return the state with the only public colors and all the original values of the other options", () => {
      const action = {
        type: LOAD_COLORS,
        colors,
      };
      const newState = optionsReducer(initialState, action);
      expect(newState.colors).toHaveLength(2);
      expect(newState.colors).toEqual(publicColors);
      expect(newState.onlyPublicOptions).toEqual(true);
      expect(newState.categories).toEqual(initialState.categories);
    });

    it("should return the state with the public and user colors and all the original values of the other options", () => {
      const action = {
        type: LOAD_COLORS,
        colors,
        userId: "id1",
      };
      const expectedColors = publicColors.concat(userColor1);
      const newState = optionsReducer(initialState, action);
      expect(newState.colors).toHaveLength(3);
      expect(newState.colors).toEqual(expectedColors);
      expect(newState.onlyPublicOptions).toEqual(false);
      expect(newState.categories).toEqual(initialState.categories);
    });
  });
});

describe("given a save color action was dispatched", () => {
  it("should return the state with the new color added and all the original values of the other options", () => {
    const newColor = { id: "4", name: "NEW", hash: "#new" };

    const action = {
      type: SAVE_COLOR,
      color: newColor,
    };

    const newState = optionsReducer(initialState, action);
    expect(newState.colors).toHaveLength(4);
    expect(newState.colors).toEqual(expect.arrayContaining([newColor]));
    expect(newState.categories).toEqual(initialState.categories);
  });
});
