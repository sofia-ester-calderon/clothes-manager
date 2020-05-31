import { clothesData } from "./data";

export function getClothes() {
  return clothesData;
}

export function getClothing(id) {
  return clothesData.find((clothing) => clothing.id === id);
}

export function saveClothing(clothing) {
  clothesData.push(clothing);
}

export function editClothing(editedClothing) {
  clothesData.map((clothing) =>
    clothing.id === editClothing.id ? editedClothing : clothing
  );
}
