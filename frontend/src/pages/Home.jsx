import { Link } from 'react-router-dom'
import { scoreText } from '../utils'

function Home({ teams, matches }) {
  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const live = matches.filter((m) => m.status === 'live')

  return (
    <div>
      <h2>Home</h2>
      <p>Manage teams, matches and live scores.</p>

      <h3>Live now</h3>
      {live.length === 0 && <p>No live matches</p>}
      <ul>
        {live.map((m) => (
          <li key={m.id}>
            <Link to={`/matches/${m.id}`}>
              {teamName(m.teamA)} vs {teamName(m.teamB)}: {scoreText(m)} ({m.sport})
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/matches">All matches</Link>
    </div>
  )
}

export default Home
