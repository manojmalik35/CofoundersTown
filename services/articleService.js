const ArticleValidator = require("../validators/articleValidator");
const UserValidator = require("../validators/userValidator");
const Article = require("../models/articles");

class ArticleService {

    async CreateArticle(userID, payload) {

        let errors = ArticleValidator.validateCreate(payload);
        if (errors) return { errors };

        let article = await Article.findOne({ title: payload.title, authorId: userID }).lean();
        if (article) return { errors: "Article already exists" }

        payload.author = userID;
        article = await Article.create(payload);
        return article;
    }

    async GetSpecificArticle(id) {
        const isValid = UserValidator.validateObjectID(id);
        if (!isValid) return { errors: "Id is not valid" };

        let article = await Article.findOne({ _id: id }).populate('author');
        return article;
    }
}

module.exports = ArticleService;