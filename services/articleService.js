const ArticleValidator = require("../validators/articleValidator");
const UserValidator = require("../validators/userValidator");
const { serverError, parseLimitAndPage } = require("../utils")
const Article = require("../models/articles");

class ArticleService {

    async CreateArticle(user, payload) {
        try {

            let errors = ArticleValidator.validateCreate(payload);
            if (errors) return { errors };

            let article = await Article.findOne({ title: payload.title, author: user }).lean();
            if (article) return { errors: "Article already exists" }

            payload.author = user._id;
            article = await Article.create(payload);

            user.articles.push(article._id);
            await user.save();
            return article;
        } catch (err) {
            return serverError(err.message)
        }
    }

    async GetSpecificArticle(id) {
        try {
            const isValid = UserValidator.validateObjectID(id);
            if (!isValid) return { errors: "Id is not valid" };

            let article = await Article.findById(id).populate('author').lean();
            return article;
        } catch (err) {
            return serverError(err.message)
        }
    }

    async GetAllArticles(filters) {
        try {
            const { limit, offset } = parseLimitAndPage(filters)
            const { tag } = filters;
            let query = tag ? { tags: tag } : {}
            const articles = await Article.find(query).skip(offset).limit(limit).sort({ updatedAt: 'desc' });
            return articles;
        } catch (err) {
            return serverError(err.message)
        }
    }
}

module.exports = ArticleService;