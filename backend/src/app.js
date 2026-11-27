import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import teamRoutes from './routes/teams.js'
import leagueRoutes from './routes/leagues.js'
import matchRoutes from './routes/matches.js'
import leaderboardRoutes from './routes/leaderboard.js'
import { protectWrites } from './middleware/auth.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/leagues', protectWrites, leagueRoutes)
app.use('/api/teams', protectWrites, teamRoutes)
app.use('/api/matches', protectWrites, matchRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

// in production the backend also serves the built frontend (one url on render)
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  // react router pages like /matches/4 -> index.html
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

export default app
