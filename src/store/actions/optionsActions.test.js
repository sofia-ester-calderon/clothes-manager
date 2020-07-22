import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import optionsActions from "./optionsActions";
import { UPDATE_COLOR, LOAD_COLORS } from "./actionTypes";
import colorApi from "../../api/colorsApi";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("given a color is edited", () => {
  it("dispatches updateColorSuccess action if api call was successful", () => {
    colorApi.updateColor = jest.fn().mockResolvedValue();

    const color = { id: "def_col_1", name: "Red", hash: "#ff1100" };

    const store = mockStore({});
    return store.dispatch(optionsActions.updateColor(color)).then(() => {
      expect(colorApi.updateColor).toHaveBeenCalledWith(color);
      expect(store.getActions()).toEqual([{ type: UPDATE_COLOR, color }]);
    });
  });

  it("does not dispatch anything if api call was unsuccessful", () => {
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
  it("dispatches setColors action if api call was successful", () => {
    const colors = [{ id: "def_col_1", name: "Red", hash: "#ff1100" }];
    colorApi.getColors = jest.fn().mockResolvedValue(colors);

    const store = mockStore({});
    return store.dispatch(optionsActions.loadColors()).then(() => {
      expect(colorApi.getColors).toHaveBeenCalled();
      expect(store.getActions()).toEqual([{ type: LOAD_COLORS, colors }]);
    });
  });

  it("does not dispatch anything if api call was unsuccessful", () => {
    colorApi.getColors = jest.fn().mockRejectedValue();

    const store = mockStore({});
    return store.dispatch(optionsActions.loadColors()).then(() => {
      expect(colorApi.getColors).toHaveBeenCalled();
      expect(store.getActions()).toEqual([]);
    });
  });
});
