const userRouter = require("express").Router();
const controller = require("../controllers/userController")
const { isLoggedIn } = require("../middlewares/auth")

userRouter.get("/me", isLoggedIn(), controller.getCurrentUser)
userRouter.get("/:id", isLoggedIn(), controller.getSpecificUser)

module.exports = userRouter;