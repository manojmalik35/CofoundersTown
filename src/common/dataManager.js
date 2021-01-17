import * as SERVICE from './service';

export const getArticlesService = async (params) => {
    return await SERVICE.getAllArticles(params)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};