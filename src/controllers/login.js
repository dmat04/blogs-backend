const router = require('express').Router()

const { checkPassword } = require('../util/password')
const { generateToken } = require('../util/login')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne(
    { where: { username: username || '' } }
  ) || {}
  const passwordIsCorrect = await checkPassword(password, user.passwordHash)

  if (!passwordIsCorrect) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = generateToken(user.username, user.id)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router