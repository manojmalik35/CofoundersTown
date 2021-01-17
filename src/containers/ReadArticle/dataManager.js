import * as SERVICE from "./service";

export const getArticleService = async (id) => {
    return await SERVICE.getArticle(id)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
}
