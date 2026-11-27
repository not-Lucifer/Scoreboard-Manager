import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreText } from '../utils'

function Matches({ teams, matches, setMatches, leagues }) {
  const [leagueId, setLeagueId] = useState('')
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [date, setDate] = useState('')
  // cricket only
  const [overs, setOvers] = useState(20)
  const [battingFirst, setBattingFirst] = useState('')

  const teamName = (id) => teams.find((t) => t.id === id)?.name || 'unknown'
  const leagueName = (id) => leagues.find((l) => l.id === id)?.name || 'unknown'
  const leagueTeams = teams.filter((t) => t.leagueId === Number(leagueId))
  const league = leagues.find((l) => l.id === Number(leagueId))
  const isCricket = league?.sport === 'cricket'

  function changeLeague(value) {
    setLeagueId(value)
    setTeamA('')
    setTeamB('')
    setBattingFirst('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!leagueId) return alert('select league')
    if (!teamA || !teamB) return alert('select both teams')
    if (teamA === teamB) return alert('pick 2 different teams')

    let newMatch = {
      id: Date.now(),
      sport: league.sport,
      leagueId: league.id,
      teamA: Number(teamA),
      teamB: Number(teamB),
      scoreA: 0,
      scoreB: 0,
      status: 'upcoming',
      date,
      events: [],
    }

    if (isCricket) {
      if (!overs || overs < 1) return alert('enter overs')
      if (!battingFirst) return alert('select who bats first')
      newMatch = {
        ...newMatch,
        scoreA: { runs: 0, wickets: 0, balls: 0 },
        scoreB: { runs: 0, wickets: 0, balls: 0 },
        overs: Number(overs),
        battingFirst: Number(battingFirst),
        innings: 1,
        log: [],
      }
    }

    setMatches([...matches, newMatch])
    changeLeague('')
    setDate('')
    setOvers(20)
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
        <select value={teamA} onChange={(e) => { setTeamA(e.target.value); setBattingFirst('') }}>
          <option value="">Team A</option>
          {leagueTeams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <select value={teamB} onChange={(e) => { setTeamB(e.target.value); setBattingFirst('') }}>
          <option value="">Team B</option>
          {leagueTeams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        {isCricket && (
          <div>
            Overs: <input type="number" min="1" value={overs} onChange={(e) => setOvers(e.target.value)} />
            {' '}Batting first:{' '}
            <select value={battingFirst} onChange={(e) => setBattingFirst(e.target.value)}>
              <option value="">select</option>
              {teamA && <option value={teamA}>{teamName(Number(teamA))}</option>}
              {teamB && <option value={teamB}>{teamName(Number(teamB))}</option>}
            </select>
            {battingFirst && teamA && teamB && (
              <span> | Bowling first: {teamName(Number(battingFirst === teamA ? teamB : teamA))}</span>
            )}
          </div>
        )}

        <button type="submit">Create Match</button>
      </form>

      <ul>
        {matches.map((m) => (
          <li key={m.id}>
            [{leagueName(m.leagueId)}] {teamName(m.teamA)} vs {teamName(m.teamB)} - {scoreText(m)} ({m.status}) {m.date}
            {m.sport === 'cricket' && ` | ${m.overs} overs`}{' '}
            <Link to={`/matches/${m.id}`}>open</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Matches
