import axios from "../api/axios-clothes";

export async function getClothes() {
  const clothesData = await axios.get("/clothes.json");
  return transformJsonToArray(clothesData.data);
}

export async function getClothing(id) {
  const clothing = await axios.get(`/clothes/${id}.json`);
  return transformToClothing(clothing.data, id);
}

export async function saveClothing(clothing) {
  return axios.post("/clothes.json", clothing);
}

export async function editClothing(clothing) {
  const jsonClothing = transformToJson(clothing);
  return axios.put("/clothes.json", jsonClothing);
}

// Just because using firebase
function transformJsonToArray(json) {
  const clothesValues = Object.values(json);
  const clothesKeys = Object.keys(json);
  clothesValues.forEach((clothing, idx) => {
    clothing.id = clothesKeys[idx];
  });
  return clothesValues;
}

function transformToClothing(obj, id) {
  obj.id = id;
  return obj;
}

function transformToJson(clothing) {
  const id = clothing.id;
  delete clothing.id;
  const jsonObj = {};
  jsonObj[id] = clothing;
  return jsonObj;
}
