import { axiosInstance } from "../../tools";
import { API } from "./Constants";

export const setTokenToAPIInstance = async (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getTokenToAPIInstance = async () => {
    return axiosInstance.defaults.headers["Authorization"];
};

export const login = async (payload) => {
    return await axiosInstance.post(API.LOGIN, payload);
};
