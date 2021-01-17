const express = require("express")
const http = require("http-status-codes").StatusCodes
const morgan = require("morgan")
const { CORS } = require("./middlewares/cors")
require("dotenv").config();
require("./config/connection")
const authRouter = require("./routers/authRouter")
const userRouter = require("./routers/userRouter")
const articleRouter = require("./routers/articleRouter");

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use(CORS());

const appRouter = express.Router();
app.use("/api/v1", appRouter);


appRouter.get("/ping", function (req, res) {
    res.status(http.OK).json({
        message: "pong"
    })
})

appRouter.use("/auth", authRouter)
appRouter.use("/users", userRouter)
appRouter.use("/articles", articleRouter)

app.use("*", function (req, res) {
    res.status(http.NOT_FOUND).json({
        message: "Page not found"
    })
})

//Error handler
// app.use(function(err, req, res, next){
//     res.status(http.INTERNAL_SERVER_ERROR).json({
//         errors : err.message
//     })
// })

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})