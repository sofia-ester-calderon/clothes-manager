import axios from "./axios-api";
import {
  transformObjectToJson,
  transformJsonToArray,
  transformJsonToObject,
} from "./firebaseHelper";

const COLORS_PREFIX = "/colors";

async function getColors(userId) {
  const baseUrl = `${COLORS_PREFIX}.json`;
  debugger;
  const publicColorsqueryParams = `?&orderBy="userId"&equalTo="all"`;
  const publicColorData = await axios.get(baseUrl + publicColorsqueryParams);
  let allColors = transformJsonToArray(publicColorData.data);

  if (userId) {
    const userColorsqueryParams = `?&orderBy="userId"&equalTo="${userId}"`;
    const userColorData = await axios.get(baseUrl + userColorsqueryParams);
    allColors = allColors.concat(transformJsonToArray(userColorData.data));
  }

  console.log(allColors);
  return allColors;
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

async function saveColor(color) {
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
