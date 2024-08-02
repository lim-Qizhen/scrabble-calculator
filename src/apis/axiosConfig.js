import axios from "axios";

export const initAxios = () => {
  axios.defaults.baseURL = "http://localhost:8000";
};
