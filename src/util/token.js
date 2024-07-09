const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const encodeToken = (username, userId, sessionId) => {
  const userForToken = {
    username,
    userId,
    sessionId,
  }

  return jwt.sign(userForToken, JWT_SECRET)
}

const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

module.exports = {
  encodeToken,
  decodeToken,
}