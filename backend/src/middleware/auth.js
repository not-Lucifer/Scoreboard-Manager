import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// needs header: Authorization: Bearer <token>
export async function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'login required' })
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(id)
    if (!req.user) return res.status(401).json({ message: 'user not found' })
    next()
  } catch {
    res.status(401).json({ message: 'invalid token' })
  }
}

// GET stays public, POST / PUT / DELETE only for admin
export function protectWrites(req, res, next) {
  if (req.method === 'GET') return next()
  return protect(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'only admin can make changes' })
    next()
  })
}
