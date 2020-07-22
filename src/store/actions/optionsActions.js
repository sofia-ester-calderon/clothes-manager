import { UPDATE_COLOR, LOAD_COLORS } from "./actionTypes";
import colorApi from "../../api/colorsApi";

const updateColorSuccess = (color) => {
  return {
    type: UPDATE_COLOR,
    color,
  };
};

const updateColor = (color) => {
  return async (dispatch) => {
    try {
      const updatedColor = await colorApi.updateColor(color);
      dispatch(updateColorSuccess(updatedColor));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const setColors = (colors) => {
  return {
    type: LOAD_COLORS,
    colors,
  };
};

const loadColors = () => {
  return async (dispatch) => {
    try {
      const colors = await colorApi.getColors();
      dispatch(setColors(colors));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const optionsActions = {
  updateColorSuccess,
  updateColor,
  setColors,
  loadColors,
};

export default optionsActions;
