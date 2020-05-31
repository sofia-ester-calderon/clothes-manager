import { clothesData } from "./data";

let allClothes = clothesData;

export function getClothes() {
  return allClothes;
}

export function getClothing(id) {
  return allClothes.find((clothing) => {
    return clothing.id === parseInt(id);
  });
}

export function saveClothing(clothing) {
  clothing.id = Math.floor(Math.random() * 1000);
  allClothes.push(clothing);
}

export function editClothing(editedClothing) {
  allClothes = allClothes.map((clothing) =>
    clothing.id === editedClothing.id ? editedClothing : clothing
  );
}
