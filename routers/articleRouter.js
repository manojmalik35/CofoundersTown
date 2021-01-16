const articleRouter = require("express").Router();
const controller = require("../controllers/articleController");
const { isLoggedIn } = require("../middlewares/auth")

articleRouter.post("", isLoggedIn(), controller.publishArticle)
articleRouter.get("/:id", isLoggedIn(), controller.getSpecificArticle)

module.exports = articleRouter;