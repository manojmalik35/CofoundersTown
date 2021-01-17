import { axiosInstance } from "../../tools";
import { API } from "./Constants";

export const getProfile = async () => {
    return await axiosInstance.get(API.GET_PROFILE);
};
