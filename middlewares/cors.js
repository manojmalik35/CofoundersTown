module.exports.CORS = () => {
    return function (req, res, next) {
        res.header("X-XSS-Protection", 1);
        res.header("X-Content-Type-Options", "nosniff");
        res.header("X-Frame-Options", "DENY");
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, DELETE, OPTIONS, PATCH"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With,Content-Type, Accept, Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin"
        );
        next();
    }
}
