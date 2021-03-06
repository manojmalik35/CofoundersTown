const http = require("http-status-codes").StatusCodes
const UserService = require("../services/userService")
const { transformUser } = require("../transformers/user")

const userService = new UserService();
module.exports.getCurrentUser = function (req, res) {
    const user = req.user;
    res.status(http.OK).json({
        data: transformUser(user)
    })
}

module.exports.getSpecificUser = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await userService.getUserByID(id);
        if (result && result.errors) {
            return res.status(http.BAD_REQUEST).json(result)
        }

        if (!result) {
            return res.status(http.BAD_REQUEST).json({
                message: "User not found"
            })
        }

        res.status(http.OK).json({ data: transformUser(result) })
    } catch (err) {
        next(err);
    }
}
