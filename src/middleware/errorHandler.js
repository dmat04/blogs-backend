class EntityNotFoundError extends Error { }

const errorHandler = async (err, req, res, next) => {
  if (err instanceof EntityNotFoundError) {
    res.status(404).end()
  } else {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = {
  errorHandler,
  EntityNotFoundError,
}