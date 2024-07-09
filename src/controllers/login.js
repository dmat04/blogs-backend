const router = require('express').Router()

const { checkPassword } = require('../util/password')
const { encodeToken } = require('../util/token')
const { User, ActiveSession } = require('../models')

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

  const session = await ActiveSession.create({
    userId: user.id
  })

  const token = encodeToken(user.username, user.id, session.id)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router