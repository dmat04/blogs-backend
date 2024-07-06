const router = require('express').Router()

const { User, Blog } = require('../models')
const { hashPassword } = require('../util/password')
const { generateToken } = require('../util/login')
const { EntityNotFoundError } = require('../middleware/errorHandler')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: { 
      model: Blog,
      attributes: { exclude: 'userId' }
    } 
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { password, username, name } = req.body
  
  if (!password || password.length < 6) {
    res.status(400).json({
      error: 'Invalid or missing password'
    })
  }

  const passwordHash = await hashPassword(password)

  const user = await User.create({
    username,
    name,
    passwordHash,
  })

  const token = generateToken(user.username, user.id)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.put('/:username', async (req, res) => {
  const { username } = req.params

  const user = await User.findOne({
    where: {
      username
    }
  })

  if (!user) throw new EntityNotFoundError()

  user.username = req.body.username
  await user.save()
  res.json(user)
})

module.exports = router