const http = require("http-status-codes").StatusCodes
const { PAGINATION_LIMIT } = require("../config")

const serverError = function (errors) {
    return {
        errors,
        code: http.INTERNAL_SERVER_ERROR
    };
};

const parseLimitAndPage = function (filters) {
    let { limit, page } = filters;
    limit = limit ? Number(limit) : PAGINATION_LIMIT;
    page = page ? Number(page) : 1;
    const offset = (page - 1) * limit;
    return { limit, offset }
}

module.exports = {
    serverError,
    parseLimitAndPage
};