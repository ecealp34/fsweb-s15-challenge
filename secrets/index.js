const HASH_ROUND = 12
const JWT_SECRET = process.env.NODE_ENV || 'users'

module.exports = {
    HASH_ROUND,
    JWT_SECRET
}