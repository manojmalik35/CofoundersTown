const http = require("http-status-codes").StatusCodes
const validator = require("../validators/userValidator")
const jwt = require("jsonwebtoken")
const UserService = require("../services/userService");
const { JWT_KEY } = require("../config")

const userService = new UserService();
module.exports.isLoggedIn = () => {
    return async function (req, res, next) {
        const headers = req.headers;
        if (headers && headers.authorization) {

            let authToken = headers.authorization.split(' ');
            if (authToken.length != 2) {
                return res.status(http.UNAUTHORIZED).json({
                    message: "Your token is not valid"
                })
            }

            authToken = authToken[1];
            if (!validator.validateJWT(authToken)) {
                return res.status(http.UNAUTHORIZED).json({
                    message: "Your token is not valid"
                })
            }

            const isValid = await jwt.verify(authToken, JWT_KEY);
            if (isValid) {
                const result = await userService.getUserByID(isValid.id);
                if (result.errors) {
                    return res.status(http.UNAUTHORIZED).json({
                        message: "Your token is not valid"
                    })
                }

                if (!result) {
                    return res.status(http.FORBIDDEN).json({
                        message: "User does not exist"
                    })
                }

                req.user = result;
                next();
            } else {
                return res.status(http.UNAUTHORIZED).json({
                    message: "Your token is not valid"
                })
            }
        } else
            res.status(http.UNAUTHORIZED).json({ message: "You are not authorized" });
    }
}