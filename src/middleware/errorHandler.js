const { ValidationError } = require('sequelize')

class EntityNotFoundError extends Error { }

const errorHandler = async (err, req, res, next) => {
  console.error(err)

  if (err instanceof EntityNotFoundError) {
    res.status(404).end()
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      validationErrors: err.errors.map(e => e.message)
    })
  } else {
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = {
  errorHandler,
  EntityNotFoundError,
}