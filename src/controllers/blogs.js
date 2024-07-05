const router = require('express').Router()
const Blog = require('../models/blog')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)

  if (req.blog) {
    next()
  } else {
    res.status(404).end()
  }
}

router.use('/:id', blogFinder)

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  await req.blog.destroy()
  res.status(200).end()
})

router.put('/:id', async (req, res) => {
  console.log(req.body.likes)

  if (req.body.likes >= 0) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(400).end()
  }
})

module.exports = router