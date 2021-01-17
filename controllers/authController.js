const http = require("http-status-codes").StatusCodes
const AuthService = require("../services/authService");
const { transformUser } = require('../transformers/user');

const authService = new AuthService();

module.exports.Signup = async function (req, res) {
    let inputs = req.body;
    let obj = await authService.Signup(inputs);
    if (obj.errors) {
        return res.status(http.BAD_REQUEST).json({
            errors: obj.errors
        })
    }

    const { user, token } = obj;
    res.status(http.CREATED).json({
        message: "You have successfully signed up.",
        data: transformUser(user),
        token: token,
    })
}

module.exports.Login = async function (req, res) {
    let inputs = req.body;
    let obj = await authService.Login(inputs);
    if (obj.errors) {
        return res.status(http.BAD_REQUEST).json({
            errors: obj.errors
        })
    }

    const { user, token } = obj;
    res.status(http.OK).json({
        message: "You have successfully logged in.",
        data: transformUser(user),
        token: token,
    })
}

