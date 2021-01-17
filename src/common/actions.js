import {TYPES} from './Constants'

export const getAllArticles = (data) => (dispatch) => {
    dispatch({
        type: TYPES.GET_ALL_ARTICLES,
        payload: data,
    });
};