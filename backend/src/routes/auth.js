import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = Router()

function sendToken(res, user, status = 200) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.status(status).json({ token, user })
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password required' })
  if (password.length < 6) return res.status(400).json({ message: 'password must be at least 6 characters' })
  if (await User.exists({ email: email.toLowerCase() })) return res.status(400).json({ message: 'email already registered' })

  // first user is admin
  const role = (await User.countDocuments()) === 0 ? 'admin' : 'scorer'
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), role })
  sendToken(res, user, 201)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'email and password required' })
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'wrong email or password' })
  }
  sendToken(res, user)
})

router.get('/me', protect, (req, res) => res.json(req.user))

export default router
