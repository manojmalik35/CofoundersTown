import axios from "axios";
import { get } from "lodash";
import { CONFIG } from "../config";
import store from "../store";

const configureAxios = () => {
  return axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: 60000,
  });
};

export const axiosInstance = configureAxios();

axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development")
      console.log("Config ======>", config);
    const AuthStore = get(store.store.getState(), "auth");
    if (AuthStore) {
      if (get(AuthStore, "isAuthenticated")) {
        const token = get(AuthStore, "user.token");
        config.headers.Authorization = `token ${token}`;
      }
    }
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development")
      console.log("Error ======>", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV === "development")
      console.log("Response ======>", res);
    return res;
  },
  (err) => {
    if (process.env.NODE_ENV === "development")
      console.log("ERROR ======>", err.response);
    return Promise.reject(err);
  },
);
