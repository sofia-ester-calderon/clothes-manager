import clothesApi from "../../api/clothesApi";
import {
  LOAD_CLOTHES,
  DELETE_CLOTHING,
  UPDATE_CLOTHING,
  SAVE_CLOTHING,
} from "./actionTypes";

const setClothes = (clothes) => {
  return {
    type: LOAD_CLOTHES,
    clothes,
  };
};

const loadClothes = (userId) => {
  return async (dispatch) => {
    try {
      const clothes = await clothesApi.getClothes(userId);
      dispatch(setClothes(clothes));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const deleteClothingSuccess = (clothingId) => {
  return {
    type: DELETE_CLOTHING,
    clothingId,
  };
};

const deleteClothing = (id) => {
  return async (dispatch) => {
    try {
      await clothesApi.deleteClothing(id);
      dispatch(deleteClothingSuccess(id));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const updateClothingSuccess = (clothing) => {
  return {
    type: UPDATE_CLOTHING,
    clothing,
  };
};

const updateClothing = (clothing) => {
  return async (dispatch) => {
    try {
      const updatedClothing = await clothesApi.updateClothing(clothing);
      dispatch(updateClothingSuccess(updatedClothing));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const saveClothingSuccess = (clothing) => {
  return {
    type: SAVE_CLOTHING,
    clothing,
  };
};

const saveClothing = (clothing) => {
  return async (dispatch) => {
    try {
      const savedClothing = await clothesApi.saveClothing(clothing);
      dispatch(saveClothingSuccess(savedClothing));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const clothesActions = {
  loadClothes,
  deleteClothing,
  updateClothing,
  saveClothing,
};

export default clothesActions;
