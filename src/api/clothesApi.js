import axios from "./axios-api";
import {
  transformJsonToArray,
  transformJsonToObject,
  transformObjectToJson,
} from "./firebaseHelper";

const CLOTHES_PREFIX = "/clothes";

export async function getClothes() {
  const clothesData = await axios.get(`${CLOTHES_PREFIX}.json`);
  return transformJsonToArray(clothesData.data);
}

export async function getClothing(id) {
  const clothing = await axios.get(`${CLOTHES_PREFIX}/${id}.json`);
  return transformJsonToObject(clothing.data, id);
}

export async function saveClothing(clothing) {
  return axios.post(`${CLOTHES_PREFIX}.json`, clothing);
}

export async function editClothing(clothing) {
  const id = clothing.id;
  const jsonClothing = transformObjectToJson(clothing);
  return axios.put(`${CLOTHES_PREFIX}/${id}.json`, jsonClothing);
}

export function deleteClothing(id) {
  axios.delete(`${CLOTHES_PREFIX}/${id}.json`);
}
