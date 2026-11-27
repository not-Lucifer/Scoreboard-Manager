import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreText } from '../utils'
import Status from '../components/Status'

function Matches({ teams, matches, setMatches, leagues }) {
  const [leagueId, setLeagueId] = useState('')
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [date, setDate] = useState('')
  // cricket only
  const [format, setFormat] = useState('T20')
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
      if (format === 'Custom' && (!overs || overs < 1 || overs > 50)) return alert('overs must be 1 to 50')
      if (!battingFirst) return alert('select who bats first')
      newMatch = {
        ...newMatch,
        scoreA: { runs: 0, wickets: 0, balls: 0 },
        scoreB: { runs: 0, wickets: 0, balls: 0 },
        format,
        overs: format === 'T20' ? 20 : format === 'ODI' ? 50 : Number(overs),
        battingFirst: Number(battingFirst),
        innings: 1,
        log: [],
        striker: '',
        nonStriker: '',
        bowler: '',
        lastBowler: '',
      }
    }

    setMatches([...matches, newMatch])
    changeLeague('')
    setDate('')
    setFormat('T20')
    setOvers(20)
  }

  return (
    <div>
      <h2>Matches</h2>

      <form onSubmit={handleSubmit} className="panel flex flex-wrap items-center gap-2">
        <p className="m-0 basis-full font-semibold">New match</p>
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
          <div className="flex basis-full flex-wrap items-center gap-2 text-sm">
            Format:{' '}
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="T20">T20 (20 overs)</option>
              <option value="ODI">ODI (50 overs)</option>
              <option value="Custom">Custom</option>
            </select>
            {format === 'Custom' && (
              <span>
                {' '}Overs: <input type="number" min="1" max="50" value={overs} onChange={(e) => setOvers(e.target.value)} />
              </span>
            )}
            {' '}Batting first:{' '}
            <select value={battingFirst} onChange={(e) => setBattingFirst(e.target.value)}>
              <option value="">select</option>
              {teamA && <option value={teamA}>{teamName(Number(teamA))}</option>}
              {teamB && <option value={teamB}>{teamName(Number(teamB))}</option>}
            </select>
            {battingFirst && teamA && teamB && (
              <span className="text-muted">Bowling first: {teamName(Number(battingFirst === teamA ? teamB : teamA))}</span>
            )}
          </div>
        )}

        <button type="submit" className="btn-primary">Create match</button>
      </form>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {matches.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
            <div className="min-w-0 flex-1">
              <p className="m-0 flex flex-wrap gap-x-3 text-sm text-muted">
                <span>{leagueName(m.leagueId)}</span>
                <span>{m.date}</span>
                {m.sport === 'cricket' && <span>{m.format || ''} {m.overs} overs</span>}
              </p>
              <p className="m-0 mt-1 font-semibold">
                {teamName(m.teamA)} vs {teamName(m.teamB)}
              </p>
              <p className="m-0 mt-1">
                <Status status={m.status} />
              </p>
            </div>
            {m.status !== 'upcoming' && <span className="num text-3xl">{scoreText(m)}</span>}
            <Link to={`/matches/${m.id}`} className="text-sm font-medium">Open</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Matches
