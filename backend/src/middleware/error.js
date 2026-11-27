export function notFound(req, res) {
  res.status(404).json({ message: 'route not found' })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: err.message })
  }
  if (err.code === 11000) return res.status(400).json({ message: 'already exists' })
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'server error' })
}
