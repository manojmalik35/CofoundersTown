const validator = require("validator");

function validateCreate(inputs) {
    let errors = {};
    if (!inputs.title)
        errors.title = "Title is required.";
    else if (!validator.isAlphanumeric(validator.blacklist(inputs.title, ' ')) || !validator.isLength(inputs.title, { min: 3 }))
        errors.title = "Title is not valid.";

    if (!inputs.description)
        errors.description = "Description is required.";
    else if (!validator.isLength(inputs.description, { min: 6, max: 100 }))
        errors.description = "Description must be between 6 and 100 characters.";

    if (!inputs.body)
        errors.body = "Body is required.";
    else if (!validator.isLength(inputs.body, { min: 30 }))
        errors.body = "Body must be at least 30 characters long.";

    if (inputs.tags) {
        if (!Array.isArray(inputs.tags)) {
            errors.tags = "Tags must be an array.";
        } else {
            for (let i = 0; i < inputs.tags.length; i++) {
                const tag = inputs.tags[i];
                if (!validator.isAlpha(validator.blacklist(tag, ' '))) {
                    errors.tags = "Tags name should be alphabetic"
                    break;
                }
                if (!validator.isLength(tag, { min: 3, max: 20 })) {
                    errors.tags = "Tags name should be between 3 and 20 characters"
                    break;
                }
            }
        }
    }

    if (Object.keys(errors).length > 0)
        return errors;
}

module.exports = {
    validateCreate,
}