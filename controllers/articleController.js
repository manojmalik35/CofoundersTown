const http = require("http-status-codes").StatusCodes
const ArticleService = require("../services/articleService");

const articleService = new ArticleService();

module.exports.publishArticle = async function (req, res) {

    let payload = req.body;
    let user = req.user;
    let result = await articleService.CreateArticle(user._id, payload);
    if (result.errors) {
        return res.status(http.BAD_REQUEST).json({
            errors: result.errors
        })
    }

    res.status(http.CREATED).json({
        message: "Article has been successfully published",
        data: result
    })
}

module.exports.getSpecificArticle = async function (req, res) {

    const id = req.params.id;
    let result = await articleService.GetSpecificArticle(id);
    if (result.errors) {
        return res.status(http.BAD_REQUEST).json(result)
    }

    if (!result) {
        return res.status(http.BAD_REQUEST).json({
            message: "Article not found"
        })
    }

    res.status(http.OK).json({ data: result })

}