const userValidator = require("../validators/userValidator");
const User = require("../models/user");
const { serverError } = require('../utils')
class UserService {

    async getUserByID(id) {
        try {
            const isValid = userValidator.validateObjectID(id);
            if (!isValid) return { errors: "Id is not valid" };

            let user = await User.findById(id).populate('articles');
            return user;
        } catch (err) {
            return serverError(err.message)
        }
    }
}

module.exports = UserService;