import { useState } from 'react'

function Leaderboard({ teams, matches, leagues }) {
  const [leagueId, setLeagueId] = useState(leagues[0]?.id ?? '')

  const isCricket = leagues.find((l) => l.id === Number(leagueId))?.sport === 'cricket'
  const leagueTeams = teams.filter((t) => t.leagueId === Number(leagueId))
  const leagueMatches = matches.filter((m) => m.leagueId === Number(leagueId) && m.status === 'finished')

  // football: 3 pts win, 1 draw | cricket: 2 pts win, 1 tie (by runs)
  const table = leagueTeams.map((t) => {
    let played = 0
    let won = 0
    let drawn = 0
    let lost = 0

    leagueMatches.forEach((m) => {
      if (m.teamA !== t.id && m.teamB !== t.id) return
      played++
      let mine = m.teamA === t.id ? m.scoreA : m.scoreB
      let other = m.teamA === t.id ? m.scoreB : m.scoreA
      if (isCricket) {
        mine = mine.runs
        other = other.runs
      }
      if (mine > other) won++
      else if (mine < other) lost++
      else drawn++
    })

    return { id: t.id, name: t.name, played, won, drawn, lost, points: isCricket ? won * 2 + drawn : won * 3 + drawn }
  })

  table.sort((a, b) => b.points - a.points)

  return (
    <div>
      <h2>Leaderboard</h2>
      <select value={leagueId} onChange={(e) => setLeagueId(e.target.value)}>
        {leagues.map((l) => (
          <option key={l.id} value={l.id}>{l.name} ({l.sport})</option>
        ))}
      </select>

      <div className="mt-6 overflow-x-auto">
      <table className="[&_td:nth-child(n+3)]:text-right [&_th:nth-child(n+3)]:w-14 [&_th:nth-child(n+3)]:text-right">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>{isCricket ? 'T' : 'D'}</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((t, i) => (
            <tr key={t.id}>
              <td className="num w-8 text-lg text-muted">{i + 1}</td>
              <td className="font-medium">{t.name}</td>
              <td>{t.played}</td>
              <td>{t.won}</td>
              <td>{t.drawn}</td>
              <td>{t.lost}</td>
              <td className="num text-xl">{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Leaderboard
