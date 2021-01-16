const userValidator = require("../validators/userValidator");
const User = require("../models/user");

class UserService {

    async getUserByID(id) {
        const isValid = userValidator.validateObjectID(id);
        if (!isValid) return { errors: "Id is not valid" };

        let user = await User.findOne({ _id: id }).populate('Article');
        return user;
    }
}

module.exports = UserService;