import axios from "./axios-api";
import { transformObjectToJson } from "./firebaseHelper";

const COLORS_PREFIX = "/colors";

const URL_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "correctUrl/api";

async function getColors() {
  const colorData = await axios.get(`${URL_API}${COLORS_PREFIX}`);
  return colorData.data;
}

async function getColor(id) {
  const color = await axios.get(`${URL_API}${COLORS_PREFIX}/${id}`);
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
