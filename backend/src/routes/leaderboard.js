import { Router } from 'express'
import League from '../models/League.js'
import Team from '../models/Team.js'
import Match from '../models/Match.js'

const router = Router()

// football: win 3, draw 1 | cricket: win 2, tie 1 (by runs)
router.get('/:leagueId', async (req, res) => {
  const leagueId = Number(req.params.leagueId)
  const league = await League.findById(leagueId)
  if (!league) return res.status(404).json({ message: 'league not found' })

  const isCricket = league.sport === 'cricket'
  const teams = await Team.find({ leagueId })
  const matches = await Match.find({ leagueId, status: 'finished' })

  const table = teams.map((t) => {
    const row = { id: t._id, name: t.name, played: 0, won: 0, drawn: 0, lost: 0 }
    matches.forEach((m) => {
      if (m.teamA !== t._id && m.teamB !== t._id) return
      row.played++
      let mine = m.teamA === t._id ? m.scoreA : m.scoreB
      let other = m.teamA === t._id ? m.scoreB : m.scoreA
      if (isCricket) {
        mine = mine?.runs ?? 0
        other = other?.runs ?? 0
      }
      if (mine > other) row.won++
      else if (mine < other) row.lost++
      else row.drawn++
    })
    row.points = isCricket ? row.won * 2 + row.drawn : row.won * 3 + row.drawn
    return row
  })

  table.sort((a, b) => b.points - a.points)
  res.json({ league, table })
})

export default router
