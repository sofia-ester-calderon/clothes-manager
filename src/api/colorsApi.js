import axios from "./axios-api";
import {
  transformObjectToJson,
  transformJsonToArray,
  transformJsonToObject,
} from "./firebaseHelper";

const COLORS_PREFIX = "/colors";

async function getColors() {
  const colorData = await axios.get(`${COLORS_PREFIX}.json`);
  return transformJsonToArray(colorData.data);
}

async function getColor(id) {
  const color = await axios.get(`${COLORS_PREFIX}/${id}.json`);
  return transformJsonToObject(color.data, id);
}

async function updateColor(color) {
  const id = color.id;
  const jsonClothing = transformObjectToJson(color);
  return axios.put(`${COLORS_PREFIX}/${id}.json`, jsonClothing);
}

const colorApi = {
  getColors,
  getColor,
  updateColor,
};

export default colorApi;
