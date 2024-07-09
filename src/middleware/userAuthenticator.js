const { decodeToken } = require('../util/token')
const { User, ActiveSession } = require('../models')

const userAuthenticator = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  const token = authorization.substring(7)
  const decodedToken = decodeToken(token)

  if (!decodedToken) {
    return res.status(401).json({ error: 'token invalid ' })
  }

  const user = await User.findByPk(decodedToken.userId)
  const session = await ActiveSession.findByPk(decodedToken.sessionId)

  if (!user) {
    return res.status(401).json({ error: `user doesn't exist` })
  } else if (user.disabled) {
    return res.status(403).json({ error: `user disabled, contact support` })
  } else if (!session) {
    return res.status(401).json({ error: `token expired` })
  }

  req.user = user
  next()
}

module.exports = userAuthenticator