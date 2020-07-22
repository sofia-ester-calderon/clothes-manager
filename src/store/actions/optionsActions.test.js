import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import optionsActions from "./optionsActions";
import { UPDATE_COLOR, LOAD_COLORS, SAVE_COLOR } from "./actionTypes";
import colorApi from "../../api/colorsApi";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("given a color is updated", () => {
  it("should dispatch updateColorSuccess action if api call was successful", () => {
    const color = { id: "def_col_1", name: "Red", hash: "#ff1100" };
    const colorFromApi = { id: "idapi", name: "Red", hash: "#ff1100" };

    colorApi.updateColor = jest.fn().mockResolvedValue(colorFromApi);

    const store = mockStore({});
    return store.dispatch(optionsActions.updateColor(color)).then(() => {
      expect(colorApi.updateColor).toHaveBeenCalledWith(color);
      expect(store.getActions()).toEqual([
        { type: UPDATE_COLOR, color: colorFromApi },
      ]);
    });
  });

  it("shold not dispatch anything if api call was unsuccessful", () => {
    colorApi.updateColor = jest.fn().mockRejectedValue();

    const color = { id: "def_col_1", name: "Red", hash: "#ff1100" };

    const store = mockStore({});
    return store.dispatch(optionsActions.updateColor(color)).then(() => {
      expect(colorApi.updateColor).toHaveBeenCalledWith(color);
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given colors are loaded", () => {
  it("should dispatch setColors action if api call was successful", () => {
    const colors = [{ id: "def_col_1", name: "Red", hash: "#ff1100" }];
    colorApi.getColors = jest.fn().mockResolvedValue(colors);

    const store = mockStore({});
    return store.dispatch(optionsActions.loadColors()).then(() => {
      expect(colorApi.getColors).toHaveBeenCalled();
      expect(store.getActions()).toEqual([{ type: LOAD_COLORS, colors }]);
    });
  });

  it("shold not dispatch anything if api call was unsuccessful", () => {
    colorApi.getColors = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(optionsActions.loadColors()).then(() => {
      expect(colorApi.getColors).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});

describe("given a color is saved", () => {
  it("should dispatch saveColor action if api call was successful", () => {
    const color = { name: "Red", hash: "#ff1100" };
    const colorFromApi = { id: "def_col_1", name: "Red", hash: "#ff1100" };
    colorApi.saveColor = jest.fn().mockResolvedValue(colorFromApi);

    const store = mockStore({});
    return store.dispatch(optionsActions.saveColor(color)).then(() => {
      expect(colorApi.saveColor).toHaveBeenCalledWith(color);
      expect(store.getActions()).toEqual([
        { type: SAVE_COLOR, color: colorFromApi },
      ]);
    });
  });

  it("shold not dispatch anything if api call was unsuccessful", () => {
    colorApi.saveColor = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(optionsActions.saveColor()).then(() => {
      expect(colorApi.saveColor).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
