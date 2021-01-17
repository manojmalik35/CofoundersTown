import { API } from './Constants'
import { axiosInstance } from "../tools";
import { makeQueryParam } from "../helpers";

export const getAllArticles = async (params) => {
    let url = `${API.GET_ALL_ARTICLES}${makeQueryParam(params)}`;
    return await axiosInstance.get(url);
};