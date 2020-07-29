import axios from "./axios-api";
const apiKey = require("./api_key.json");

async function signUp(authDetails) {
  const authToken = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.key}`,
    authDetails
  );
  return authToken.data;
}

async function login(authDetails) {
  const authToken = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey.key}`,
    authDetails
  );
  return authToken.data;
}

async function getToken() {
  if (isTokenExpired()) {
    const tokenPayload = {
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("refreshToken"),
    };
    const newToken = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey.key}`,
      tokenPayload
    );
    setLocalStorageItems(newToken.data);
  }
  return localStorage.getItem("token");
}

function isTokenExpired() {
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  return !localStorage.getItem("expirationDate") || expirationDate < new Date();
}

async function getUserDetails() {
  const idToken = localStorage.getItem("token");
  if (!idToken || isTokenExpired()) {
    return null;
  }
  const userData = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey.key}`,
    { idToken }
  );
  return userData.data.users[0];
}

const removeLocalStorageItems = () => {
  localStorage.setItem("token", null);
  localStorage.setItem("refreshToken", null);
  localStorage.setItem("expirationDate", null);
};

const setLocalStorageItems = (token) => {
  const expiresIn = token.expiresIn || token.expires_in;
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem("token", token.idToken || token.id_token);
  localStorage.setItem(
    "refreshToken",
    token.refreshToken || token.refresh_token
  );
  localStorage.setItem("expirationDate", expirationDate);
};

const authApi = {
  signUp,
  login,
  getToken,
  setLocalStorageItems,
  getUserDetails,
  removeLocalStorageItems,
};

export default authApi;
