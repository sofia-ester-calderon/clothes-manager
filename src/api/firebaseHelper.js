// Just because using firebase
export function transformJsonToArray(json) {
  const clothesValues = Object.values(json);
  const clothesKeys = Object.keys(json);
  clothesValues.forEach((clothing, idx) => {
    clothing.id = clothesKeys[idx];
  });
  return clothesValues;
}

export function transformJsonToObject(json, id) {
  const obj = { ...json };
  obj.id = id;
  return obj;
}

export function transformObjectToJson(object) {
  const jsonObject = { ...object };
  delete jsonObject.id;
  return jsonObject;
}
