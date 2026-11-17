function Teams({ teams }) {
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t.id}>
            {t.name} ({t.shortName}) - {t.players.length} players
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Teams
