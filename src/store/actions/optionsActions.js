import { EDIT_COLOR } from "./actionTypes";

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
