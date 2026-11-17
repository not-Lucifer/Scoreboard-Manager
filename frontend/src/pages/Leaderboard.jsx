function Leaderboard({ teams, matches }) {
  // 3 pts win, 1 pt draw
  const table = teams.map((t) => {
    let played = 0
    let won = 0
    let drawn = 0
    let lost = 0

    matches.forEach((m) => {
      if (m.status !== 'finished') return
      if (m.teamA !== t.id && m.teamB !== t.id) return
      played++
      const mine = m.teamA === t.id ? m.scoreA : m.scoreB
      const other = m.teamA === t.id ? m.scoreB : m.scoreA
      if (mine > other) won++
      else if (mine < other) lost++
      else drawn++
    })

    return { id: t.id, name: t.name, played, won, drawn, lost, points: won * 3 + drawn }
  })

  table.sort((a, b) => b.points - a.points)

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.name}</td>
              <td>{t.played}</td>
              <td>{t.won}</td>
              <td>{t.drawn}</td>
              <td>{t.lost}</td>
              <td>{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
