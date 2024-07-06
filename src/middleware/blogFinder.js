const { Blog } = require('../models')
const { EntityNotFoundError } = require('../middleware/errorHandler')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)

  if (!req.blog) throw new EntityNotFoundError()

  next()
}

module.exports = blogFinder