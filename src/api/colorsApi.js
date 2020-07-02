import axios from "./axios-api";
import {
  transformJsonToArray,
  transformJsonToObject,
  transformObjectToJson,
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

async function editColor(color) {
  const id = color.id;
  const jsonClothing = transformObjectToJson(color);
  return axios.put(`${COLORS_PREFIX}/${id}.json`, jsonClothing);
}

const colorApi = {
  getColors,
  getColor,
  editColor,
};

export default colorApi;
