import { axiosInstance } from "../../tools";
import { API } from "./Constants";

export const publishArticle = async (payload) => {
    return await axiosInstance.post(API.PUBLISH_ARTICLE, payload);
};
