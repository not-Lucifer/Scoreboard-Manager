import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreText } from '../utils'

function Matches({ teams, matches, setMatches, leagues }) {
  const [leagueId, setLeagueId] = useState('')
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [date, setDate] = useState('')

  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const leagueName = (id) => leagues.find((l) => l.id === id)?.name || 'unknown'
  const leagueTeams = teams.filter((t) => t.leagueId === Number(leagueId))

  function changeLeague(value) {
    setLeagueId(value)
    setTeamA('')
    setTeamB('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!leagueId) return alert('select league')
    if (!teamA || !teamB) return alert('select both teams')
    if (teamA === teamB) return alert('pick 2 different teams')
    const league = leagues.find((l) => l.id === Number(leagueId))
    const newMatch = {
      id: Date.now(),
      sport: league.sport,
      leagueId: league.id,
      teamA: Number(teamA),
      teamB: Number(teamB),
      scoreA: league.sport === 'cricket' ? { runs: 0, wickets: 0, balls: 0 } : 0,
      scoreB: league.sport === 'cricket' ? { runs: 0, wickets: 0, balls: 0 } : 0,
      status: 'upcoming',
      date,
    }
    setMatches([...matches, newMatch])
    changeLeague('')
    setDate('')
  }

  return (
    <div>
      <h2>Matches</h2>

      <form onSubmit={handleSubmit}>
        <select value={leagueId} onChange={(e) => changeLeague(e.target.value)}>
          <option value="">League</option>
          {leagues.map((l) => (
            <option key={l.id} value={l.id}>{l.name} ({l.sport})</option>
          ))}
        </select>
        <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
          <option value="">Team A</option>
          {leagueTeams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
          <option value="">Team B</option>
          {leagueTeams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Create Match</button>
      </form>

      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            [{leagueName(m.leagueId)}] {teamName(m.teamA)} vs {teamName(m.teamB)} - {scoreText(m)} ({m.status}) {m.date}{' '}
            <Link to={`/matches/${m.id}`}>open</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Matches
