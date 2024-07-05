const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { JWT_SECRET } = require('../util/config')
const { checkPassword } = require('../util/password')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne(
    { where: { username: username || '' } }
  ) || {}
  const passwordIsCorrect = await checkPassword(password, user.passwordHash)

  console.log(passwordIsCorrect)
  if (!passwordIsCorrect) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router