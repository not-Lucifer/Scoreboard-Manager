import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function TeamDetails({ teams, setTeams, leagues }) {
  const { id } = useParams()
  const [player, setPlayer] = useState('')
  const team = teams.find((t) => t.id === Number(id))

  if (!team) return <p>Team not found</p>

  function addPlayer(e) {
    e.preventDefault()
    if (!player) return
    setTeams(teams.map((t) => (t.id === team.id ? { ...t, players: [...t.players, player] } : t)))
    setPlayer('')
  }

  return (
    <div>
      <Link to="/teams" className="text-sm">Back to teams</Link>
      <h2 className="mt-4 mb-1">
        {team.name} <span className="num text-muted">{team.shortName}</span>
      </h2>
      <p className="mt-0 text-muted">
        <span className="capitalize">{team.sport}</span>, {leagues.find((l) => l.id === team.leagueId)?.name}
      </p>

      <h3>Players</h3>
      {team.players.length === 0 && <p className="text-muted">No players yet. Add the first one below.</p>}
      <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
        {team.players.map((p, i) => (
          <li key={i} className="flex gap-3 border-b border-line py-2">
            <span className="num w-5 text-right text-muted">{i + 1}</span>
            {p}
          </li>
        ))}
      </ol>

      {team.subs && (
        <div>
          <h3>Substitutes</h3>
          <ul className="grid border-t border-line text-muted sm:grid-cols-2 sm:gap-x-8">
            {team.subs.map((p, i) => (
              <li key={i} className="border-b border-line py-2">{p}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={addPlayer} className="mt-8 flex flex-wrap gap-2">
        <input placeholder="Player name" value={player} onChange={(e) => setPlayer(e.target.value)} />
        <button type="submit" className="btn-primary">Add player</button>
      </form>
    </div>
  )
}

export default TeamDetails
