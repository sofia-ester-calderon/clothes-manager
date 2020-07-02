import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-clothes-manager.firebaseio.com/",
});

export default instance;
