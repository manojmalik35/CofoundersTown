const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const UserValidator = require("../validators/userValidator")
const { JWT_KEY, CRYPTO_ROUNDS } = require("../config")
const User = require("../models/user")

class AuthService {

    async Signup(payload) {

        let errors = UserValidator.validateSignup(payload);
        if (errors) return { errors };

        let user = await User.findOne({ email: payload.email }).lean();
        if (user) {
            errors = {}
            errors.email = "email already exists."
            return { errors }
        }

        const cipher = await bcrypt.hash(payload.password, CRYPTO_ROUNDS)
        payload.password = cipher;

        user = await User.create(payload);
        const id = user._id;
        const token = jwt.sign({ id }, JWT_KEY);
        return { user, token }
    }

    async Login(payload) {

        let errors = UserValidator.validateLogin(payload);
        if (errors) return { errors };

        let user = await User.findOne({ email: payload.email }).lean();
        if (!user) {
            return { errors: "Either email or password is wrong" }
        }

        const dbPassword = user.password;
        const decrypted = await bcrypt.compare(payload.password, dbPassword);
        if (!decrypted) {
            return { errors: "Either email or password is wrong" }
        }

        const id = user._id;
        const token = jwt.sign({ id }, JWT_KEY);
        return { user, token }
    }
}

module.exports = AuthService;