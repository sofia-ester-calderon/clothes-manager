import axios from "./axios-api";
import {
  transformJsonToArray,
  transformJsonToObject,
  transformObjectToJson,
} from "./firebaseHelper";

const CLOTHES_PREFIX = "/colors";

export async function getColors() {
  const colorData = await axios.get(`${CLOTHES_PREFIX}.json`);
  return transformJsonToArray(colorData.data);
}

export async function getColor(id) {
  const color = await axios.get(`${CLOTHES_PREFIX}/${id}.json`);
  return transformJsonToObject(color.data, id);
}

// export async function saveClothing(clothing) {
//   return axios.post(`${CLOTHES_PREFIX}.json`, clothing);
// }

// export async function editClothing(clothing) {
//   const jsonClothing = transformObjectToJson(clothing);
//   return axios.put(`${CLOTHES_PREFIX}.json`, jsonClothing);
// }

// export function deleteClothing(id) {
//   axios.delete(`${CLOTHES_PREFIX}/${id}.json`);
// }
