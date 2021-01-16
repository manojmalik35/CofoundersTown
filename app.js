const express = require("express")
const http = require("http-status-codes").StatusCodes
const morgan = require("morgan")
const { CORS } = require("./middlewares/cors")
require("dotenv").config();
require("./config/connection")
const authRouter = require("./routers/authRouter")

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

appRouter.use("/users", authRouter)

app.use("*", function (req, res) {
    res.status(404).json({
        message: "Page not found"
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})