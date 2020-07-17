import clothesApi from "../../api/clothesApi";
import { LOAD_CLOTHES } from "./actionTypes";

const setClothes = (clothes) => {
  return {
    type: LOAD_CLOTHES,
    clothes,
  };
};

const loadClothes = () => {
  return async (dispatch) => {
    try {
      const clothes = await clothesApi.getClothes();
      dispatch(setClothes(clothes));
    } catch (error) {
      // Error is handled by ApiErrorHandler
    }
  };
};

const clothesActions = { loadClothes };

export default clothesActions;
