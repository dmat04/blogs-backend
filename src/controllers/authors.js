const router = require('express').Router()
const { fn, col } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('sum', col('likes')), 'likes'],
      [fn('count', col('id')), 'articles']
    ],
    group: [
      col('author')
    ],
    order: [[ 'likes', 'DESC' ]]
  })

  res.json(authors)
})

module.exports = router