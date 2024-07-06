const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')

const generateToken = (username, userId) => {
  const userForToken = {
    username,
    id: userId,
  }

  return jwt.sign(userForToken, JWT_SECRET)
}

module.exports = {
  generateToken
}