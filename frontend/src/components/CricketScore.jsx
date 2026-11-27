import { useState } from 'react'
import { overs } from '../utils'

function CricketScore({ match, teams, updateMatch }) {
  const [batter, setBatter] = useState('')
  const [bowler, setBowler] = useState('')

  // which side bats in this innings
  const firstSide = match.battingFirst === match.teamA ? 'scoreA' : 'scoreB'
  const secondSide = firstSide === 'scoreA' ? 'scoreB' : 'scoreA'
  const batSide = match.innings === 1 ? firstSide : secondSide
  const batTeam = teams.find((t) => t.id === (batSide === 'scoreA' ? match.teamA : match.teamB))
  const bowlTeam = teams.find((t) => t.id === (batSide === 'scoreA' ? match.teamB : match.teamA))
  const s = match[batSide]
  const target = match[firstSide].runs + 1

  function addBall(runs, isWicket, isWide) {
    if (!batter || !bowler) return alert('select batter and bowler')

    const newScore = {
      runs: s.runs + runs,
      wickets: isWicket ? s.wickets + 1 : s.wickets,
      balls: isWide ? s.balls : s.balls + 1,
    }

    let what = runs + ' run'
    if (isWide) what = 'wide'
    if (isWicket) what = 'OUT'
    const entry = { id: Date.now(), text: `${overs(newScore.balls)} ${bowler} to ${batter}: ${what}` }
    const changes = { [batSide]: newScore, log: [entry, ...match.log] }

    const allOut = newScore.wickets >= 10
    const oversDone = newScore.balls >= match.overs * 6
    const chased = match.innings === 2 && newScore.runs >= target

    if (allOut || oversDone || chased) {
      if (match.innings === 1) {
        changes.innings = 2
        setBowler('')
        alert(`innings over, target ${newScore.runs + 1}`)
      } else {
        changes.status = 'finished'
        alert('match over')
      }
      setBatter('')
    }
    if (isWicket) setBatter('')

    updateMatch(changes)
  }

  return (
    <div>
      <p>{match.overs} overs | Innings {match.innings}</p>
      <p>Batting: {batTeam?.name} | Bowling: {bowlTeam?.name}</p>
      {match.innings === 2 && match.status === 'live' && (
        <p>Target {target} - need {target - s.runs} from {match.overs * 6 - s.balls} balls</p>
      )}

      {match.status === 'live' && (
        <div>
          Batter:{' '}
          <select value={batter} onChange={(e) => setBatter(e.target.value)}>
            <option value="">select</option>
            {(batTeam?.players || []).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {' '}Bowler:{' '}
          <select value={bowler} onChange={(e) => setBowler(e.target.value)}>
            <option value="">select</option>
            {(bowlTeam?.players || []).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <p>
            <button onClick={() => addBall(0)}>0</button>
            <button onClick={() => addBall(1)}>1</button>
            <button onClick={() => addBall(2)}>2</button>
            <button onClick={() => addBall(4)}>4</button>
            <button onClick={() => addBall(6)}>6</button>
            <button onClick={() => addBall(1, false, true)}>wide</button>
            <button onClick={() => addBall(0, true)}>wicket</button>
          </p>
        </div>
      )}

      <h3>Ball by ball</h3>
      {match.log.length === 0 && <p>nothing yet</p>}
      <ul>
        {match.log.map((b) => (
          <li key={b.id}>{b.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default CricketScore
