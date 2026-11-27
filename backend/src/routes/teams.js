import { Router } from 'express'
import Team from '../models/Team.js'
import Match from '../models/Match.js'

const router = Router()

// GET /api/teams?leagueId=1
router.get('/', async (req, res) => {
  const filter = req.query.leagueId ? { leagueId: Number(req.query.leagueId) } : {}
  res.json(await Team.find(filter).sort({ _id: 1 }))
})

router.get('/:id', async (req, res) => {
  const team = await Team.findById(Number(req.params.id))
  if (!team) return res.status(404).json({ message: 'team not found' })
  res.json(team)
})

router.post('/', async (req, res) => {
  const { id, name, shortName, sport, leagueId, players, subs } = req.body
  const team = await Team.create({ _id: id, name, shortName, sport, leagueId, players, subs })
  res.status(201).json(team)
})

router.put('/:id', async (req, res) => {
  const { name, shortName, players, subs } = req.body
  const team = await Team.findByIdAndUpdate(
    Number(req.params.id),
    { name, shortName, players, subs },
    { returnDocument: 'after', runValidators: true },
  )
  if (!team) return res.status(404).json({ message: 'team not found' })
  res.json(team)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const used = await Match.exists({ $or: [{ teamA: id }, { teamB: id }] })
  if (used) return res.status(400).json({ message: 'team has matches, delete them first' })
  const team = await Team.findByIdAndDelete(id)
  if (!team) return res.status(404).json({ message: 'team not found' })
  res.json({ message: 'team deleted' })
})

export default router
