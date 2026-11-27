import { Link } from 'react-router-dom'
import { scoreText } from '../utils'
import Status from '../components/Status'

function Home({ teams, matches }) {
  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const live = matches.filter((m) => m.status === 'live')

  return (
    <div>
      <h2>Live now</h2>
      <p className="text-muted">Football and cricket matches being scored right now.</p>

      {live.length === 0 && (
        <p className="text-muted">
          No match is live. Start one from <Link to="/matches">Matches</Link>.
        </p>
      )}
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {live.map((m) => (
          <li key={m.id}>
            <Link
              to={`/matches/${m.id}`}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-ink hover:no-underline hover:text-turf"
            >
              <span>
                <span className="block font-semibold">
                  {teamName(m.teamA)} vs {teamName(m.teamB)}
                </span>
                <span className="mt-1 flex items-center gap-3">
                  <Status status={m.status} />
                  <span className="text-sm text-muted capitalize">{m.sport}</span>
                </span>
              </span>
              <span className="num text-4xl">{scoreText(m)}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        <Link to="/matches">All matches</Link>
      </p>
    </div>
  )
}

export default Home
