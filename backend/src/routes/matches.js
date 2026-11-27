import { Router } from 'express'
import Match from '../models/Match.js'
import Team from '../models/Team.js'

const router = Router()

// fields the client is allowed to change
const FIELDS = [
  'sport', 'leagueId', 'teamA', 'teamB', 'scoreA', 'scoreB', 'status', 'date', 'events',
  'format', 'overs', 'battingFirst', 'innings', 'striker', 'nonStriker', 'bowler', 'lastBowler', 'freeHit', 'log',
]

function pick(body) {
  const data = {}
  FIELDS.forEach((f) => {
    if (body[f] !== undefined) data[f] = body[f]
  })
  return data
}

// GET /api/matches?leagueId=1&status=live
router.get('/', async (req, res) => {
  const filter = {}
  if (req.query.leagueId) filter.leagueId = Number(req.query.leagueId)
  if (req.query.status) filter.status = req.query.status
  res.json(await Match.find(filter).sort({ _id: 1 }))
})

router.get('/:id', async (req, res) => {
  const match = await Match.findById(Number(req.params.id))
  if (!match) return res.status(404).json({ message: 'match not found' })
  res.json(match)
})

router.post('/', async (req, res) => {
  const data = pick(req.body)
  if (data.teamA === data.teamB) return res.status(400).json({ message: 'pick 2 different teams' })
  const count = await Team.countDocuments({ _id: { $in: [data.teamA, data.teamB] }, leagueId: data.leagueId })
  if (count !== 2) return res.status(400).json({ message: 'both teams must be in the league' })
  const match = await Match.create({ _id: req.body.id, ...data })
  res.status(201).json(match)
})

// update score / status / events / ball log
router.put('/:id', async (req, res) => {
  const match = await Match.findByIdAndUpdate(Number(req.params.id), pick(req.body), {
    returnDocument: 'after',
    runValidators: true,
  })
  if (!match) return res.status(404).json({ message: 'match not found' })
  res.json(match)
})

router.delete('/:id', async (req, res) => {
  const match = await Match.findByIdAndDelete(Number(req.params.id))
  if (!match) return res.status(404).json({ message: 'match not found' })
  res.json({ message: 'match deleted' })
})

export default router
