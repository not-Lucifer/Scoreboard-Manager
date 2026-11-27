import { useState } from 'react'

const types = ['goal', 'penalty goal', 'penalty missed', 'yellow card', 'red card']
const goalTypes = ['goal', 'penalty goal']

function FootballScore({ match, teams, updateMatch }) {
  const [minute, setMinute] = useState('')
  const [type, setType] = useState('goal')
  const [teamId, setTeamId] = useState('')
  const [player, setPlayer] = useState('')

  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const team = teams.find((t) => t.id === Number(teamId))
  const sorted = [...match.events].sort((a, b) => a.minute - b.minute)

  function addEvent(e) {
    e.preventDefault()
    if (!minute || !teamId || !player) return alert('fill minute, team and player')

    const ev = { id: Date.now(), minute: Number(minute), type, teamId: Number(teamId), player }
    const changes = { events: [...match.events, ev] }
    if (goalTypes.includes(type)) {
      if (ev.teamId === match.teamA) changes.scoreA = match.scoreA + 1
      else changes.scoreB = match.scoreB + 1
    }
    updateMatch(changes)
    setMinute('')
    setPlayer('')
  }

  return (
    <div>
      {match.status === 'live' && (
        <form onSubmit={addEvent}>
          <input type="number" min="1" max="120" placeholder="Minute" value={minute} onChange={(e) => setMinute(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={teamId} onChange={(e) => { setTeamId(e.target.value); setPlayer('') }}>
            <option value="">Team</option>
            <option value={match.teamA}>{teamName(match.teamA)}</option>
            <option value={match.teamB}>{teamName(match.teamB)}</option>
          </select>
          <select value={player} onChange={(e) => setPlayer(e.target.value)}>
            <option value="">Player</option>
            {(team?.players || []).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      )}

      <h3>Match events</h3>
      {sorted.length === 0 && <p>nothing yet</p>}
      <ul>
        {sorted.map((ev) => (
          <li key={ev.id}>
            {ev.minute}' {ev.type} - {ev.player} ({teamName(ev.teamId)})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FootballScore
