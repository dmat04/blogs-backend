const router = require('express').Router()

const { EntityNotFoundError } = require('../middleware/errorHandler')
const { userAuthenticator } = require('../middleware')
const { ReadingListBlog } = require('../models')

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

router.put('/:id', userAuthenticator, async (req, res) => {
  const { id } = req.params
  const { read } = req.body
  
  const readingListEntry = await ReadingListBlog.findByPk(id)
  
  if (!readingListEntry) throw new EntityNotFoundError()

  if (req.user.id !== readingListEntry.userId) {
    return res.status(403).end()
  }

  if (typeof read !== 'boolean') {
    return res.status(400).end()
  }

  readingListEntry.read = read;
  await readingListEntry.save()

  res
    .status(200)
    .send(readingListEntry)
})

module.exports = router