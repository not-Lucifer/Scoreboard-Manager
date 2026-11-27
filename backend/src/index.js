import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((err) => {
    console.error('db connection failed:', err.message)
    process.exit(1)
  })
