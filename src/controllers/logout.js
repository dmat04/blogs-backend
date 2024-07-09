const router = require('express').Router()

const { userAuthenticator } = require('../middleware')
const { ActiveSession } = require('../models')

router.delete('/', userAuthenticator, async (req, res) => {
  await ActiveSession.destroy({
    where: {
      userId: req.user.id
    }
  })

  res.status(200).end()
})

module.exports = router