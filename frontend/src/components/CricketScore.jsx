import { useState } from 'react'
import { overs } from '../utils'

function ballText(b) {
  if (b.wicket) return 'OUT'
  if (b.extra === 'wide') return 'wide' + (b.runs ? ' +' + b.runs : '')
  if (b.extra === 'no ball') return 'no ball' + (b.runs ? ' +' + b.runs : '')
  if (b.extra) return b.runs + ' ' + b.extra
  return b.runs + ' run'
}

function CricketScore({ match, teams, updateMatch }) {
  const [extra, setExtra] = useState('')

  // which side bats in this innings
  const firstSide = match.battingFirst === match.teamA ? 'scoreA' : 'scoreB'
  const secondSide = firstSide === 'scoreA' ? 'scoreB' : 'scoreA'
  const batSide = match.innings === 1 ? firstSide : secondSide
  const batTeam = teams.find((t) => t.id === (batSide === 'scoreA' ? match.teamA : match.teamB))
  const bowlTeam = teams.find((t) => t.id === (batSide === 'scoreA' ? match.teamB : match.teamA))
  const s = match[batSide]
  const target = match[firstSide].runs + 1

  const striker = match.striker || ''
  const nonStriker = match.nonStriker || ''
  const bowler = match.bowler || ''
  const lastBowler = match.lastBowler || ''

  const outs = match.log.filter((b) => b.innings === match.innings && b.wicket).map((b) => b.batter)
  const nextBatters = (batTeam?.players || []).filter((p) => !outs.includes(p) && p !== striker && p !== nonStriker)
  const bowlers = (bowlTeam?.players || []).filter((p) => p !== lastBowler)

  function addBall(runs, isWicket) {
    if (!striker || !nonStriker || !bowler) return alert('select striker, non striker and bowler')

    const ex = isWicket ? '' : extra
    const legal = ex !== 'wide' && ex !== 'no ball'
    const total = legal ? runs : runs + 1

    const newScore = {
      runs: s.runs + total,
      wickets: isWicket ? s.wickets + 1 : s.wickets,
      balls: legal ? s.balls + 1 : s.balls,
    }

    const ball = { innings: match.innings, over: overs(newScore.balls), batter: striker, bowler, runs, extra: ex, wicket: !!isWicket }
    const changes = { [batSide]: newScore, log: [ball, ...match.log] }

    // strike change on odd runs
    let st = striker
    let ns = nonStriker
    if (runs % 2 === 1) [st, ns] = [ns, st]
    if (isWicket) st = ''

    // over done -> swap ends and new bowler
    if (legal && newScore.balls % 6 === 0) {
      ;[st, ns] = [ns, st]
      changes.lastBowler = bowler
      changes.bowler = ''
    }
    changes.striker = st
    changes.nonStriker = ns

    const allOut = newScore.wickets >= 10
    const oversDone = newScore.balls >= match.overs * 6
    const chased = match.innings === 2 && newScore.runs >= target

    if (allOut || oversDone || chased) {
      changes.striker = ''
      changes.nonStriker = ''
      changes.bowler = ''
      changes.lastBowler = ''
      if (match.innings === 1) {
        changes.innings = 2
        alert(`innings over, target ${newScore.runs + 1}`)
      } else {
        changes.status = 'finished'
        alert('match over')
      }
    }

    setExtra('')
    updateMatch(changes)
  }

  function pick(list, field) {
    return (
      <select value="" onChange={(e) => updateMatch({ [field]: e.target.value })}>
        <option value="">select</option>
        {list.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    )
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
          <p>
            Striker: {striker ? striker + ' *' : pick(nextBatters, 'striker')}
            {' | '}Non striker: {nonStriker || pick(nextBatters, 'nonStriker')}
            {' '}<button onClick={() => updateMatch({ striker: nonStriker, nonStriker: striker })}>swap strike</button>
          </p>
          <p>
            Bowler: {bowler || pick(bowlers, 'bowler')}
            {lastBowler && ` (last over: ${lastBowler})`}
          </p>
          <p>
            Extra:{' '}
            <select value={extra} onChange={(e) => setExtra(e.target.value)}>
              <option value="">none</option>
              <option value="wide">wide</option>
              <option value="no ball">no ball</option>
              <option value="bye">bye</option>
              <option value="leg bye">leg bye</option>
            </select>
            {' '}Runs:{' '}
            {[0, 1, 2, 3, 4, 6].map((r) => (
              <button key={r} onClick={() => addBall(r)}>{r}</button>
            ))}
            {' '}<button onClick={() => addBall(0, true)}>wicket</button>
          </p>
        </div>
      )}

      <h3>Ball by ball</h3>
      {match.log.length === 0 && <p>nothing yet</p>}
      <ul>
        {match.log.map((b, i) => (
          <li key={match.log.length - i}>
            {b.over} {b.bowler} to {b.batter}: {ballText(b)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CricketScore
