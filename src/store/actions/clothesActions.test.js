import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import clothesActions from "./clothesActions";
import clothesApi from "../../api/clothesApi";
import {
  LOAD_CLOTHES,
  DELETE_CLOTHING,
  UPDATE_CLOTHING,
  SAVE_CLOTHING,
} from "./actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const clothing = {
  id: 1,
  category: "Tops",
  type: "type",
  colors: ["1", "2"],
  rating: 1,
  occasion: "occasion",
};

describe("given clothes are loaded", () => {
  it("should dispatch setClothes action if api call was successful", () => {
    const clothes = [clothing];

    clothesApi.getClothes = jest.fn().mockResolvedValue(clothes);

    const store = mockStore({});
    return store.dispatch(clothesActions.loadClothes()).then(() => {
      expect(clothesApi.getClothes).toHaveBeenCalled();
      expect(store.getActions()).toEqual([{ type: LOAD_CLOTHES, clothes }]);
    });
  });

  it("should not dispatch any action if api call was unsuccessful", () => {
    clothesApi.getClothes = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(clothesActions.loadClothes()).then(() => {
      expect(clothesApi.getClothes).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given clothing is deleted", () => {
  it("should dispatch a deleteClothingSuccess action if api call was successful", () => {
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

  it("should not dispatch any action if api call was unsuccessful", () => {
    clothesApi.deleteClothing = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(clothesActions.deleteClothing()).then(() => {
      expect(clothesApi.deleteClothing).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given clothing item is updated", () => {
  it("should dispatch a updateClothingSuccess action if api call was successful", () => {
    const clothingFromApi = {
      category: "Other",
      type: "type",
      colors: ["1", "2"],
      rating: 1,
      occasion: "occasion",
    };

    clothesApi.updateClothing = jest.fn().mockResolvedValue(clothingFromApi);

    const store = mockStore({});
    return store.dispatch(clothesActions.updateClothing(clothing)).then(() => {
      expect(clothesApi.updateClothing).toHaveBeenCalledWith(clothing);
      expect(store.getActions()).toEqual([
        { type: UPDATE_CLOTHING, clothing: clothingFromApi },
      ]);
    });
  });

  it("should not dispatch any action if api call was unsuccessful", () => {
    clothesApi.updateClothing = jest.fn().mockRejectedValue();
    const store = mockStore({});

    return store.dispatch(clothesActions.updateClothing(clothing)).then(() => {
      expect(clothesApi.updateClothing).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given clothing item is saved", () => {
  it("should dispatch a saveClothingSuccess action if api call was successful", () => {
    const clothingFromApi = {
      category: "Other",
      type: "type",
      colors: ["1", "2"],
      rating: 1,
      occasion: "occasion",
    };

    clothesApi.saveClothing = jest.fn().mockResolvedValue(clothingFromApi);

    const store = mockStore({});
    return store.dispatch(clothesActions.saveClothing(clothing)).then(() => {
      expect(clothesApi.saveClothing).toHaveBeenCalledWith(clothing);
      expect(store.getActions()).toEqual([
        { type: SAVE_CLOTHING, clothing: clothingFromApi },
      ]);
    });
  });

  it("should not dispatch any action if api call was unsuccessful", () => {
    clothesApi.saveClothing = jest.fn().mockRejectedValue();
    const store = mockStore({});

    return store.dispatch(clothesActions.saveClothing(clothing)).then(() => {
      expect(clothesApi.updateClothing).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
