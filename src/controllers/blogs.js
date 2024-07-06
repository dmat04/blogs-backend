const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { blogFinder, userAuthenticator } = require('../middleware')

router.use('/:id', blogFinder)

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username', 'name']
    },
    where,
    order: [[ 'likes', 'DESC' ]]
  })

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