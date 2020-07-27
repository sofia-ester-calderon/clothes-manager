import axios from "./axios-api";
const apiKey = require("./api_key.json");

async function signUp(authDetails) {
  const authToken = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.key}`,
    authDetails
  );
  return authToken.data;
}

const authApi = {
  signUp,
};

export default authApi;
