import { UPDATE_COLOR, LOAD_COLORS, SAVE_COLOR } from "./actionTypes";
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

const setColors = (colors, userId) => {
  return {
    type: LOAD_COLORS,
    colors,
    userId,
  };
};

const loadColors = (userId) => {
  return async (dispatch) => {
    try {
      const colors = await colorApi.getColors();
      dispatch(setColors(colors, userId));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const saveColorSuccess = (color) => {
  return {
    type: SAVE_COLOR,
    color,
  };
};

const saveColor = (color, userId) => {
  return async (dispatch) => {
    try {
      const savedColor = await colorApi.saveColor(color, userId);
      dispatch(saveColorSuccess(savedColor));
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
  saveColor,
};

export default optionsActions;
