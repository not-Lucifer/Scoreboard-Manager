import express from 'express'
import cors from 'cors'
import teamRoutes from './routes/teams.js'
import leagueRoutes from './routes/leagues.js'
import matchRoutes from './routes/matches.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/leagues', leagueRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/matches', matchRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
