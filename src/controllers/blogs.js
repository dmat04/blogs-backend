const router = require('express').Router()

const Blog = require('../models/blog')
const userAuthenticator = require('../middleware/userAuthenticator')
const { EntityNotFoundError } = require('../middleware/errorHandler')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)

  if (!req.blog) throw new EntityNotFoundError()

  next()
}

router.use('/:id', blogFinder)

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', userAuthenticator, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.user.id
  })
  res.json(blog)
})

router.delete('/:id', userAuthenticator, async (req, res) => {
  if (req.blog.userId !== req.user.id) {
    return res.status(403).end()
  }
  
  await req.blog.destroy()
  res.status(200).end()
})

router.put('/:id', async (req, res) => {
  const likes = req.body.likes
  
  if (likes === undefined || likes < 0) throw new Error('Number of likes must be >= 0')

  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router