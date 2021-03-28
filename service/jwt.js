const jwt = require('jsonwebtoken')

const verifyUser = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    verifyUser
}