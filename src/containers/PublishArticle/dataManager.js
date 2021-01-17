import * as SERVICE from "./service";

export const publishArticleService = async (payload) => {
    return await SERVICE.publishArticle(payload)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
}
