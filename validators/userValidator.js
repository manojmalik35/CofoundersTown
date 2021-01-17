const validator = require("validator");
const ObjectId = require('mongoose').Types.ObjectId;

function validateSignup(inputs) {
    let errors = {};
    if (!inputs.email)
        errors.email = "Email is required.";
    else if (!validator.isEmail(inputs.email))
        errors.email = "Email is not valid.";

    if (!inputs.password)
        errors.password = "Password is required.";
    else if (!validator.isLength(inputs.password, { min: 6, max: 100 }))
        errors.password = "Password must be at least 6 characters.";

    if (!inputs.confirmPassword)
        errors.confirmPassword = "Confirm Password is required.";
    else if (!validator.equals(inputs.confirmPassword, inputs.password))
        errors.confirmPassword = "Password does not match with confirmPassword.";

    if (!inputs.name)
        errors.name = "Name is required.";
    else if (!validator.isAlpha(validator.blacklist(inputs.name, ' ')))
        errors.name = "Name cannot contain any numbers or special characters.";
    else if(!validator.isLength(inputs.name, { min: 3 }))
        errors.name = "Name must be at least 3 characters";


    if (inputs.age) {
        if (inputs.age < 18 || inputs.age > 100)
            errors.age = "Age must be between 18 and 100";
    }

    if (Object.keys(errors).length > 0)
        return errors;
}

function validateLogin(inputs) {
    let errors = {};
    if (!inputs.email)
        errors.email = "Email is required.";
    else if (!validator.isEmail(inputs.email))
        errors.email = "Email is not valid.";

    if (!inputs.password)
        errors.password = "Password is required.";
    else if (!validator.isLength(inputs.password, { min: 6, max: 100 }))
        errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0)
        return errors;
}

function validateObjectID(id) {
    return ObjectId.isValid(id) && new ObjectId(id) == id
}

function validateJWT(token) {
    return validator.isJWT(token);
}

module.exports = {
    validateSignup,
    validateLogin,
    validateObjectID,
    validateJWT
}