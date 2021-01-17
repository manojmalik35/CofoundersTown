const http = require("http-status-codes").StatusCodes
const ArticleService = require("../services/articleService");
const { transformArticle } = require("../transformers/article")

const articleService = new ArticleService();

module.exports.publishArticle = async function (req, res, next) {

    try {
        let payload = req.body;
        let user = req.user;
        let result = await articleService.CreateArticle(user, payload);
        if (result.errors) {
            return res.status(http.BAD_REQUEST).json({
                errors: result.errors
            })
        }

        res.status(http.CREATED).json({
            message: "Article has been successfully published",
            data: transformArticle(result)
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getSpecificArticle = async function (req, res, next) {

    try {
        const id = req.params.id;
        let result = await articleService.GetSpecificArticle(id);
        if (result && result.errors) {
            return res.status(result.code || http.BAD_REQUEST).json({
                errors: result.errors
            })
        }

        if (!result) {
            return res.status(http.BAD_REQUEST).json({
                message: "Article not found"
            })
        }

        res.status(http.OK).json({
            data: transformArticle(result)
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getAllArticles = async function (req, res, next) {

    try {

        const filters = req.query;
        let result = await articleService.GetAllArticles(filters);
        if (result && result.errors) {
            return res.status(result.code || http.BAD_REQUEST).json({
                errors: result.errors
            })
        }
        if (!result) {
            return res.status(http.BAD_REQUEST).json({
                message: "Articles not found"
            })
        }

        result = result.map(art => transformArticle(art))
        res.status(http.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}