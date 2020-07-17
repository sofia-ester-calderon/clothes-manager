import { EDIT_COLOR, LOAD_COLORS } from "./actionTypes";
import colorApi from "../../api/colorsApi";

const editColorSuccess = (color) => {
  return {
    type: EDIT_COLOR,
    color,
  };
};

const editColor = (color) => {
  return async (dispatch) => {
    try {
      await colorApi.editColor(color);
      dispatch(editColorSuccess(color));
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

const initColors = () => {
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
  editColorSuccess,
  editColor,
  setColors,
  initColors,
};

export default optionsActions;
