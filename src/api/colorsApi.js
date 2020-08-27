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
  const updatedColor = await axios.put(
    `${COLORS_PREFIX}/${id}.json`,
    jsonClothing
  );
  return transformJsonToObject(updatedColor.data, id);
}

async function saveColor(color, userId) {
  color.userId = userId;
  const id = await axios.post(`${COLORS_PREFIX}.json`, color);
  return transformJsonToObject(color, id.data.name);
}

const colorApi = {
  getColors,
  getColor,
  updateColor,
  saveColor,
};

export default colorApi;
