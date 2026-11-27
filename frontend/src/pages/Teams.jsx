import { useState } from 'react'
import { Link } from 'react-router-dom'

function Teams({ teams, setTeams, leagues }) {
  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')
  const [leagueId, setLeagueId] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !leagueId) return alert('enter name and pick league')
    const league = leagues.find((l) => l.id === Number(leagueId))
    const newTeam = { id: Date.now(), name, shortName, sport: league.sport, leagueId: league.id, players: [] }
    setTeams([...teams, newTeam])
    setName('')
    setShortName('')
    setLeagueId('')
  }

  function deleteTeam(id) {
    setTeams(teams.filter((t) => t.id !== id))
  }

  return (
    <div>
      <h2>Teams</h2>

      <form onSubmit={handleSubmit} className="panel flex flex-wrap gap-2">
        <input placeholder="Team name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Short name" value={shortName} onChange={(e) => setShortName(e.target.value)} />
        <select value={leagueId} onChange={(e) => setLeagueId(e.target.value)}>
          <option value="">League</option>
          {leagues.map((l) => (
            <option key={l.id} value={l.id}>{l.name} ({l.sport})</option>
          ))}
        </select>
        <button type="submit" className="btn-primary">Add team</button>
      </form>

      {leagues.map((l) => (
        <div key={l.id}>
          <h3>
            {l.name} <span className="font-normal text-muted capitalize">{l.sport}</span>
          </h3>
          <ul className="divide-y divide-line border-y border-line">
            {teams
              .filter((t) => t.leagueId === l.id)
              .map((t) => (
                <li key={t.id} className="flex items-center gap-3 py-2.5">
                  <span className="num w-10 text-lg text-muted">{t.shortName}</span>
                  <Link to={`/teams/${t.id}`} className="font-medium">{t.name}</Link>
                  <span className="ml-auto text-sm text-muted">{t.players.length} players</span>
                  <button onClick={() => deleteTeam(t.id)} className="px-2 py-1 text-xs text-muted">Delete</button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Teams
