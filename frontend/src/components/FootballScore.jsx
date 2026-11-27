import { useState } from 'react'

const types = ['goal', 'penalty goal', 'own goal', 'penalty missed', 'yellow card', 'red card', 'substitution']
const goalTypes = ['goal', 'penalty goal']

function FootballScore({ match, teams, updateMatch }) {
  const [minute, setMinute] = useState('')
  const [type, setType] = useState('goal')
  const [teamId, setTeamId] = useState('')
  const [player, setPlayer] = useState('')
  const [playerIn, setPlayerIn] = useState('')

  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const team = teams.find((t) => t.id === Number(teamId))
  const sorted = [...match.events].sort((a, b) => a.minute - b.minute)

  // players still on pitch (after subs and red cards)
  function onPitch(tid) {
    let list = [...(teams.find((t) => t.id === tid)?.players || [])]
    sorted.forEach((ev) => {
      if (ev.teamId !== tid) return
      if (ev.type === 'substitution') list = list.filter((p) => p !== ev.player).concat(ev.playerIn)
      if (ev.type === 'red card') list = list.filter((p) => p !== ev.player)
    })
    return list
  }

  // subs not used yet
  function bench(tid) {
    const used = match.events.filter((ev) => ev.type === 'substitution').map((ev) => ev.playerIn)
    return (teams.find((t) => t.id === tid)?.subs || []).filter((p) => !used.includes(p))
  }

  // which team gets the goal (own goal goes to other team)
  function goalFor(ev) {
    if (goalTypes.includes(ev.type)) return ev.teamId
    if (ev.type === 'own goal') return ev.teamId === match.teamA ? match.teamB : match.teamA
    return null
  }

  function addEvent(e) {
    e.preventDefault()
    if (!minute || !teamId || !player) return alert('fill minute, team and player')
    if (type === 'substitution' && !playerIn) return alert('select player coming in')
    const subsDone = match.events.filter((ev) => ev.type === 'substitution' && ev.teamId === Number(teamId)).length
    if (type === 'substitution' && subsDone >= 5) return alert('max 5 subs allowed')

    const ev = { id: match.events.length + 1, minute: Number(minute), type, teamId: Number(teamId), player }
    if (type === 'substitution') ev.playerIn = playerIn
    const changes = { events: [...match.events, ev] }
    const g = goalFor(ev)
    if (g === match.teamA) changes.scoreA = match.scoreA + 1
    if (g === match.teamB) changes.scoreB = match.scoreB + 1
    updateMatch(changes)
    setMinute('')
    setPlayer('')
    setPlayerIn('')
  }

  function deleteEvent(ev) {
    const changes = { events: match.events.filter((x) => x !== ev) }
    const g = goalFor(ev)
    if (g === match.teamA) changes.scoreA = match.scoreA - 1
    if (g === match.teamB) changes.scoreB = match.scoreB - 1
    updateMatch(changes)
  }

  return (
    <div>
      {match.status === 'live' && (
        <form onSubmit={addEvent} className="panel flex flex-wrap items-center gap-2">
          <input className="w-24" type="number" min="1" max="120" placeholder="Minute" value={minute} onChange={(e) => setMinute(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={teamId} onChange={(e) => { setTeamId(e.target.value); setPlayer(''); setPlayerIn('') }}>
            <option value="">Team</option>
            <option value={match.teamA}>{teamName(match.teamA)}</option>
            <option value={match.teamB}>{teamName(match.teamB)}</option>
          </select>
          <select value={player} onChange={(e) => setPlayer(e.target.value)}>
            <option value="">{type === 'substitution' ? 'Player out' : 'Player'}</option>
            {(team ? onPitch(team.id) : []).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {type === 'substitution' && (
            <select value={playerIn} onChange={(e) => setPlayerIn(e.target.value)}>
              <option value="">Player in</option>
              {(team ? bench(team.id) : []).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          )}
          <button type="submit" className="btn-primary">Add event</button>
        </form>
      )}

      <h3>Match events</h3>
      {sorted.length === 0 && <p className="text-muted">No events yet.</p>}
      <ul className="divide-y divide-line border-y border-line">
        {sorted.map((ev, i) => (
          <li key={i} className="py-2.5">
            <span className="num inline-block w-12 text-xl">{ev.minute}'</span>{' '}
            {ev.type === 'yellow card' && <span className="mr-1.5 inline-block h-3.5 w-2.5 rounded-[2px] bg-yellow-400 align-[-2px]"></span>}
            {ev.type === 'red card' && <span className="mr-1.5 inline-block h-3.5 w-2.5 rounded-[2px] bg-live align-[-2px]"></span>}
            <span className={goalFor(ev) ? 'font-semibold' : ''}>{ev.type}</span> - {ev.type === 'substitution' ? `out ${ev.player}, in ${ev.playerIn}` : ev.player}{' '}
            <span className="text-muted">({teamName(ev.teamId)})</span>
            {match.status === 'live' && (
              <button onClick={() => deleteEvent(ev)} className="ml-3 px-2 py-0.5 text-xs text-muted">Remove</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FootballScore
