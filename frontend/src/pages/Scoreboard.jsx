import { useParams, Link } from 'react-router-dom'

function Scoreboard({ teams, matches, setMatches }) {
  const { id } = useParams()
  const match = matches.find((m) => m.id === Number(id))

  if (!match) return <p>Match not found</p>

  const teamName = (tid) => teams.find((t) => t.id === tid)?.name || 'unknown'

  function updateMatch(changes) {
    setMatches(matches.map((m) => (m.id === match.id ? { ...m, ...changes } : m)))
  }

  return (
    <div>
      <Link to="/matches">back</Link>
      <h2>{teamName(match.teamA)} vs {teamName(match.teamB)}</h2>
      <p>Status: {match.status}</p>
      <h1>{match.scoreA} - {match.scoreB}</h1>

      {match.status === 'live' && (
        <div>
          <p>
            {teamName(match.teamA)}{' '}
            <button onClick={() => updateMatch({ scoreA: match.scoreA + 1 })}>+1</button>
            <button onClick={() => updateMatch({ scoreA: Math.max(0, match.scoreA - 1) })}>-1</button>
          </p>
          <p>
            {teamName(match.teamB)}{' '}
            <button onClick={() => updateMatch({ scoreB: match.scoreB + 1 })}>+1</button>
            <button onClick={() => updateMatch({ scoreB: Math.max(0, match.scoreB - 1) })}>-1</button>
          </p>
          <button onClick={() => updateMatch({ status: 'finished' })}>End Match</button>
        </div>
      )}

      {match.status === 'upcoming' && <button onClick={() => updateMatch({ status: 'live' })}>Start Match</button>}
      {match.status === 'finished' && <p>Match over</p>}
    </div>
  )
}

export default Scoreboard
