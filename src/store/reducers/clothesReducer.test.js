import {
  LOAD_CLOTHES,
  DELETE_CLOTHING,
  UPDATE_CLOTHING,
  SAVE_CLOTHING,
  LOGOUT,
} from "../actions/actionTypes";
import clothesReducer from "./clothesReducer";

const clothes = [
  {
    id: 1,
    category: "Tops",
    type: "Sweater",
    colors: ["def_col_1"],
    rating: 5,
    occasion: "Everyday",
  },
  {
    id: 2,
    category: "Tops",
    type: "T-Shirt",
    colors: ["def_col_2"],
    rating: 4,
    occasion: "Sport",
  },
  {
    id: 3,
    category: "Bottoms",
    type: "Jeans",
    colors: ["def_col_3"],
    rating: 2,
    occasion: "Everyday",
  },
];

describe("given a load clothes action was dispatched", () => {
  it("should return the state with new clothes", () => {
    const initialState = [];
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

describe("given a delete clothing action was dispatched", () => {
  const deleteId = 1;
  const initialState = clothes;

  it("should return the state without the deleted clothing", () => {
    const action = { type: DELETE_CLOTHING, clothingId: deleteId };

    const newState = clothesReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual(expect.not.arrayContaining([clothes[0]]));
  });
});

describe("given a update clothing action was dispatched", () => {
  it("should return the state  with the updated clothing item", () => {
    const initialState = clothes;
    const clothing = {
      id: 1,
      category: "CHANGED",
      type: "CHANGED",
      colors: ["CHANGED", "CHANGED1", "CHANGED2"],
      rating: 1,
      occasion: "CHANGED",
    };
    const action = { type: UPDATE_CLOTHING, clothing };

    const newState = clothesReducer(initialState, action);

    expect(newState).toHaveLength(3);
    expect(newState[0]).toEqual(clothing);
  });
});

describe("given a save clothing action was dispatched", () => {
  it("should return the state with the new clothing item added", () => {
    const initialState = clothes;
    const clothing = {
      category: "NEW",
      type: "NEW",
      colors: ["NEW1", "NEW2"],
      rating: 5,
      occasion: "NEW",
    };
    const action = { type: SAVE_CLOTHING, clothing };

    const newState = clothesReducer(initialState, action);

    expect(newState).toHaveLength(4);
    expect(newState).toEqual(expect.arrayContaining([clothing]));
  });
});

describe("given the user logged out", () => {
  it("should return an empty state", () => {
    const initialState = clothes;
    const action = { type: LOGOUT };

    const newState = clothesReducer(initialState, action);

    expect(newState).toHaveLength(0);
  });
});
