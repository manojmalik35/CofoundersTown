const authRouter = require("express").Router();
const controller = require("../controllers/authController")

authRouter.post("/signup", controller.Signup)
authRouter.post("/login", controller.Login)

module.exports = authRouter;