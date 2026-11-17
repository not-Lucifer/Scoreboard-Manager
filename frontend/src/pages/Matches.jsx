import { useState } from 'react'
import { Link } from 'react-router-dom'

function Matches({ teams, matches, setMatches }) {
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [date, setDate] = useState('')

  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'

  function handleSubmit(e) {
    e.preventDefault()
    if (!teamA || !teamB) return alert('select both teams')
    if (teamA === teamB) return alert('pick 2 different teams')
    const newMatch = {
      id: Date.now(),
      teamA: Number(teamA),
      teamB: Number(teamB),
      scoreA: 0,
      scoreB: 0,
      status: 'upcoming',
      date,
    }
    setMatches([...matches, newMatch])
    setTeamA('')
    setTeamB('')
    setDate('')
  }

  return (
    <div>
      <h2>Matches</h2>

      <form onSubmit={handleSubmit}>
        <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
          <option value="">Team A</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
          <option value="">Team B</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Create Match</button>
      </form>

      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            {teamName(m.teamA)} vs {teamName(m.teamB)} - {m.scoreA} : {m.scoreB} ({m.status}) {m.date}{' '}
            <Link to={`/matches/${m.id}`}>open</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Matches
