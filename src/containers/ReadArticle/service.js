import { axiosInstance } from "../../tools";
import { API } from "./Constants";

export const getArticle = async (id) => {
    const url = API.GET_ARTICLE.replace(":id", id);
    return await axiosInstance.get(url);
};
