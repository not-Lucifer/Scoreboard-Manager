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
      <Link to="/teams">back</Link>
      <h2>{team.name} ({team.shortName})</h2>
      <p>{team.sport} - {leagues.find((l) => l.id === team.leagueId)?.name}</p>

      <h3>Players</h3>
      {team.players.length === 0 && <p>No players yet</p>}
      <ul>
        {team.players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <form onSubmit={addPlayer}>
        <input placeholder="Player name" value={player} onChange={(e) => setPlayer(e.target.value)} />
        <button type="submit">Add Player</button>
      </form>
    </div>
  )
}

export default TeamDetails
