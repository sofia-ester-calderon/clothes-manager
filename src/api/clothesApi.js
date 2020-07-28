import axios from "./axios-api";
import authApi from './authApi';
import {
  transformJsonToArray,
  transformJsonToObject,
  transformObjectToJson,
} from "./firebaseHelper";

const CLOTHES_PREFIX = "/clothes";

async function getClothes() {
  const token = authApi.getToken()
  const clothesData = await axios.get(`${CLOTHES_PREFIX}.json?auth=${token}`);
  return transformJsonToArray(clothesData.data);
}

async function getClothing(id) {
  const token = authApi.getToken()
  const clothing = await axios.get(`${CLOTHES_PREFIX}/${id}.json?auth=${token}`);
  return transformJsonToObject(clothing.data, id);
}

async function saveClothing(clothing) {
  const token = authApi.getToken()
  const id = await axios.post(`${CLOTHES_PREFIX}.json?auth=${token}`, clothing);
  return transformJsonToObject(clothing, id.data.name);
}

async function updateClothing(clothing) {
  const token = authApi.getToken()
  const id = clothing.id;
  const jsonClothing = transformObjectToJson(clothing);
  const updatedClothing = await axios.put(
    `${CLOTHES_PREFIX}/${id}.json?auth=${token}`,
    jsonClothing
  );
  return transformJsonToObject(updatedClothing.data, id);
}

function deleteClothing(id) {
  const token = authApi.getToken()
  axios.delete(`${CLOTHES_PREFIX}/${id}.json?auth=${token}`);
}

const clothesApi = {
  getClothes,
  getClothing,
  saveClothing,
  updateClothing,
  deleteClothing,
};

export default clothesApi;
