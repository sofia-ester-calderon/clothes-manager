import { clothesData } from "../data/data";
import axios from "../api/axios-clothes";

let allClothes = clothesData;

export function getClothes() {
  return allClothes;
}

export function getClothing(id) {
  return allClothes.find((clothing) => {
    return clothing.id === parseInt(id);
  });
}

export async function saveClothing(clothing) {
  return axios.post("/clothes.json", clothing);
}

export function editClothing(clothing) {
  return axios.put("/clothes.jsoddddn", clothing);
}
