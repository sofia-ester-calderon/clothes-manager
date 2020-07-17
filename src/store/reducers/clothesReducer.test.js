import { LOAD_CLOTHES, DELETE_CLOTHING } from "../actions/actionTypes";
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
