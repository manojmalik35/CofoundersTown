const express = require("express")
require("dotenv").config();
const http = require("http-status-codes").StatusCodes
const morgan = require("morgan")
const { CORS } = require("./middlewares/cors")
const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use(CORS());

app.get("/ping", function (req, res) {
    res.status(http.OK).json({
        message: "pong"
    })
})

app.use("*", function (req, res) {
    res.status(404).json({
        message: "Page not found"
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})