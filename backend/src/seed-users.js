// adds demo login users (keeps all other data)
// run: npm run seed:users
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import User from './models/User.js'

const demoUsers = [
  { name: 'Admin', username: 'admin', email: 'admin@scoreboard.local', password: 'admin123', role: 'admin' },
  { name: 'Student', username: 'student', email: 'student@scoreboard.local', password: 'student123', role: 'student' },
]

try {
  await connectDB()
  // old role name
  await User.updateMany({ role: 'scorer' }, { role: 'student' })
  for (const u of demoUsers) {
    const password = await bcrypt.hash(u.password, 10)
    const found = await User.findOne({ $or: [{ username: u.username }, { email: u.email }] })
    if (found) {
      Object.assign(found, { ...u, password })
      await found.save()
    } else {
      await User.create({ ...u, password })
    }
    console.log(`user ready: ${u.username} (${u.role})`)
  }
} catch (err) {
  console.error('seed users failed:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
