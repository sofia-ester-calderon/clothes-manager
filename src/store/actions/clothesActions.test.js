import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import clothesActions from "./clothesActions";
import clothesApi from "../../api/clothesApi";
import { LOAD_CLOTHES, DELETE_CLOTHING } from "./actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("given clothes are loaded", () => {
  it("dispatches setClothes action if api call was successful", () => {
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

    clothesApi.getClothes = jest.fn().mockResolvedValue(clothes);

    const store = mockStore({});
    return store.dispatch(clothesActions.loadClothes()).then(() => {
      expect(clothesApi.getClothes).toHaveBeenCalled();
      expect(store.getActions()).toEqual([{ type: LOAD_CLOTHES, clothes }]);
    });
  });

  it("does not dispatch any action if api call was unsuccessful", () => {
    clothesApi.getClothes = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(clothesActions.loadClothes()).then(() => {
      expect(clothesApi.getClothes).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given cllothing is deleted", () => {
  it("dispatches a deleteClothingSuccess action if api call was successful", () => {
    clothesApi.deleteClothing = jest.fn().mockResolvedValue();

    const clothingId = "1";

    const store = mockStore({});
    return store
      .dispatch(clothesActions.deleteClothing(clothingId))
      .then(() => {
        expect(clothesApi.deleteClothing).toHaveBeenCalledWith(clothingId);
        expect(store.getActions()).toEqual([
          { type: DELETE_CLOTHING, clothingId },
        ]);
      });
  });

  it("does not dispatch any action if api call was unsuccessful", () => {
    clothesApi.deleteClothing = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(clothesActions.deleteClothing()).then(() => {
      expect(clothesApi.deleteClothing).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
