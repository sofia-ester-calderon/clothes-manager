import axios from "./axios-api";
import {
  transformJsonToArray,
  transformJsonToObject,
  transformObjectToJson,
} from "./firebaseHelper";

const CLOTHES_PREFIX = "/clothes";

async function getClothes() {
  const clothesData = await axios.get(`${CLOTHES_PREFIX}.json`);
  return transformJsonToArray(clothesData.data);
}

async function getClothing(id) {
  const clothing = await axios.get(`${CLOTHES_PREFIX}/${id}.json`);
  return transformJsonToObject(clothing.data, id);
}

async function saveClothing(clothing) {
  const id = await axios.post(`${CLOTHES_PREFIX}.json`, clothing);
  return transformJsonToObject(clothing, id.data.name);
}

async function updateClothing(clothing) {
  const id = clothing.id;
  const jsonClothing = transformObjectToJson(clothing);
  const updatedClothing = await axios.put(
    `${CLOTHES_PREFIX}/${id}.json`,
    jsonClothing
  );
  return transformJsonToObject(updatedClothing.data, id);
}

function deleteClothing(id) {
  axios.delete(`${CLOTHES_PREFIX}/${id}.json`);
}

const clothesApi = {
  getClothes,
  getClothing,
  saveClothing,
  updateClothing,
  deleteClothing,
};

export default clothesApi;
