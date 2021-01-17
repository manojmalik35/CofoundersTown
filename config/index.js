module.exports = {
    DB : process.env.DB,
    JWT_KEY : process.env.JWT_KEY,
    CRYPTO_ROUNDS : Number(process.env.CRYPTO_ROUNDS),
    PAGINATION_LIMIT : Number(process.env.PAGINATION_LIMIT)
}