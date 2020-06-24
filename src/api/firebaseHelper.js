// Just because using firebase
export function transformJsonToArray(json) {
  const clothesValues = Object.values(json);
  const clothesKeys = Object.keys(json);
  clothesValues.forEach((clothing, idx) => {
    clothing.id = clothesKeys[idx];
  });
  return clothesValues;
}

export function transformJsonToObject(obj, id) {
  obj.id = id;
  return obj;
}

export function transformObjectToJson(clothing) {
  const id = clothing.id;
  delete clothing.id;
  const jsonObj = {};
  jsonObj[id] = clothing;
  return jsonObj;
}
