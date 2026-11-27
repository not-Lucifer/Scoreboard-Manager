import { useParams, Link } from 'react-router-dom'
import { scoreText } from '../utils'
import CricketScore from '../components/CricketScore'
import FootballScore from '../components/FootballScore'

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
      <p>{match.sport} | Status: {match.status}</p>
      <h1>{scoreText(match)}</h1>

      {match.sport === 'football' && <FootballScore match={match} teams={teams} updateMatch={updateMatch} />}
      {match.sport === 'cricket' && <CricketScore match={match} teams={teams} updateMatch={updateMatch} />}

      {match.status === 'upcoming' && <button onClick={() => updateMatch({ status: 'live' })}>Start Match</button>}
      {match.status === 'live' && <button onClick={() => updateMatch({ status: 'finished' })}>End Match</button>}
      {match.status === 'finished' && <p>Match over</p>}
    </div>
  )
}

export default Scoreboard
