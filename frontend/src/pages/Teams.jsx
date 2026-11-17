import { useState } from 'react'

function Teams({ teams, setTeams }) {
  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name) return
    const newTeam = { id: Date.now(), name, shortName, players: [] }
    setTeams([...teams, newTeam])
    setName('')
    setShortName('')
  }

  function deleteTeam(id) {
    setTeams(teams.filter((t) => t.id !== id))
  }

  return (
    <div>
      <h2>Teams</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Team name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Short name" value={shortName} onChange={(e) => setShortName(e.target.value)} />
        <button type="submit">Add Team</button>
      </form>

      <ul>
        {teams.map((t) => (
          <li key={t.id}>
            {t.name} ({t.shortName}) - {t.players.length} players{' '}
            <button onClick={() => deleteTeam(t.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Teams
