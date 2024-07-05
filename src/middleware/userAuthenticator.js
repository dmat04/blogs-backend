const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../util/config')
const { User } = require('../models')

const userAuthenticator = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
      const user = await User.findByPk(decodedToken.id)
      
      if (user) {
        req.user = user
      } else {
        return res.status(401).json({ error: 'token invalid '})  
      }
    } catch { 
      return res.status(401).json({ error: 'token invalid '})
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

module.exports = userAuthenticator