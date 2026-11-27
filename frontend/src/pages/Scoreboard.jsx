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
      <Link to="/matches" className="text-sm">Back to matches</Link>
      <h2 className="mt-4 mb-1">{teamName(match.teamA)} vs {teamName(match.teamB)}</h2>
      <p className="mt-0 text-sm text-muted">
        <span className="capitalize">{match.sport}</span> | Status: {match.status}
      </p>
      <h1 className={'num my-8 leading-none ' + (match.sport === 'cricket' ? 'text-5xl sm:text-7xl' : 'text-8xl sm:text-9xl')}>
        {scoreText(match)}
      </h1>

      {match.sport === 'football' && <FootballScore match={match} teams={teams} updateMatch={updateMatch} />}
      {match.sport === 'cricket' && <CricketScore match={match} teams={teams} updateMatch={updateMatch} />}

      <div className="mt-8">
        {match.status === 'upcoming' && <button className="btn-primary" onClick={() => updateMatch({ status: 'live' })}>Start match</button>}
        {match.status === 'live' && <button onClick={() => updateMatch({ status: 'finished' })}>End match</button>}
        {match.status === 'finished' && <p className="text-muted">Match over</p>}
      </div>
    </div>
  )
}

export default Scoreboard
