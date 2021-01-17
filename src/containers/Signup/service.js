import { axiosInstance } from "../../tools";
import { API } from "./Constants";

export const setTokenToAPIInstance = async (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const signup = async (payload) => {
    return await axiosInstance.post(API.SIGNUP, payload);
};
