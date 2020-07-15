import { EDIT_COLOR, LOAD_COLORS } from "./actionTypes";
import colorApi from "../../api/colorsApi";

export const editColorSuccess = (color) => {
  return {
    type: EDIT_COLOR,
    color,
  };
};

export const editColor = (color) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(editColorSuccess(color));
    }, 2000);
  };
};

export const setColors = (colors) => {
  return {
    type: LOAD_COLORS,
    colors,
  };
};

export const initColors = () => {
  return async (dispatch) => {
    try {
      const colors = await colorApi.getColors();
      dispatch(setColors(colors));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};
