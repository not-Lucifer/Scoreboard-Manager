function Matches({ teams, matches }) {
  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            {teamName(m.teamA)} vs {teamName(m.teamB)} - {m.scoreA} : {m.scoreB} ({m.status}) {m.date}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Matches
