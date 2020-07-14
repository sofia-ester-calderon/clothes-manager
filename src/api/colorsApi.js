import axios from "./axios-api";
import { transformObjectToJson } from "./firebaseHelper";

const COLORS_PREFIX = "/colors";

async function getColors() {
  const colorData = await axios.get(
    `http://localhost:5000/api${COLORS_PREFIX}`
  );
  return colorData.data;
}

async function getColor(id) {
  const color = await axios.get(
    `http://localhost:5000/api${COLORS_PREFIX}/${id}`
  );
  return color.data;
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
