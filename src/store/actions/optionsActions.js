export const EDIT_COLOR = "EDIT_COLOR";

export const editColor = (color) => {
  return {
    type: EDIT_COLOR,
    color,
  };
};
