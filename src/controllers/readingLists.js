const router = require('express').Router()

const { ReadingListBlog, User, Blog } = require('../models')
const { EntityNotFoundError } = require('../middleware/errorHandler')

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  
  const readingListEntry = await ReadingListBlog.create({
    userId,
    blogId,
  })

  res
    .status(200)
    .send(readingListEntry)
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