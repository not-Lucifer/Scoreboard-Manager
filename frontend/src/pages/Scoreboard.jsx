import { useParams, Link } from 'react-router-dom'
import { scoreText } from '../utils'

function Scoreboard({ teams, matches, setMatches }) {
  const { id } = useParams()
  const match = matches.find((m) => m.id === Number(id))

  if (!match) return <p>Match not found</p>

  const teamName = (tid) => teams.find((t) => t.id === tid)?.name || 'unknown'

  function updateMatch(changes) {
    setMatches(matches.map((m) => (m.id === match.id ? { ...m, ...changes } : m)))
  }

  // cricket: side is 'scoreA' or 'scoreB'
  function addBall(side, runs, isWicket, isWide) {
    const s = match[side]
    if (s.wickets >= 10) return alert('all out')
    updateMatch({
      [side]: {
        runs: s.runs + runs,
        wickets: isWicket ? s.wickets + 1 : s.wickets,
        balls: isWide ? s.balls : s.balls + 1,
      },
    })
  }

  function cricketButtons(side) {
    return (
      <span>
        <button onClick={() => addBall(side, 0)}>0</button>
        <button onClick={() => addBall(side, 1)}>1</button>
        <button onClick={() => addBall(side, 2)}>2</button>
        <button onClick={() => addBall(side, 4)}>4</button>
        <button onClick={() => addBall(side, 6)}>6</button>
        <button onClick={() => addBall(side, 1, false, true)}>wide</button>
        <button onClick={() => addBall(side, 0, true)}>wicket</button>
      </span>
    )
  }

  return (
    <div>
      <Link to="/matches">back</Link>
      <h2>{teamName(match.teamA)} vs {teamName(match.teamB)}</h2>
      <p>{match.sport} | Status: {match.status}</p>
      <h1>{scoreText(match)}</h1>

      {match.status === 'live' && match.sport === 'football' && (
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
        </div>
      )}

      {match.status === 'live' && match.sport === 'cricket' && (
        <div>
          <p>
            {teamName(match.teamA)} {cricketButtons('scoreA')}
          </p>
          <p>
            {teamName(match.teamB)} {cricketButtons('scoreB')}
          </p>
        </div>
      )}

      {match.status === 'upcoming' && <button onClick={() => updateMatch({ status: 'live' })}>Start Match</button>}
      {match.status === 'live' && <button onClick={() => updateMatch({ status: 'finished' })}>End Match</button>}
      {match.status === 'finished' && <p>Match over</p>}
    </div>
  )
}

export default Scoreboard
