const router = require('express').Router()

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

module.exports = router