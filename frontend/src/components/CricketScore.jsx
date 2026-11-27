import { useState } from 'react'
import { overs } from '../utils'
import Scorecard from './Scorecard'

function ballText(b) {
  let t = b.runs + ' run'
  if (b.extra === 'wide') t = 'wide' + (b.runs ? ' +' + b.runs : '')
  else if (b.extra === 'no ball') t = 'no ball' + (b.runs ? ' +' + b.runs : '')
  else if (b.extra) t = b.runs + ' ' + b.extra
  if (b.how === 'run out') return t + ', RUN OUT ' + b.out
  if (b.wicket) return 'OUT'
  return t
}

function CricketScore({ match, teams, updateMatch }) {
  const [extra, setExtra] = useState('')
  const [runOutWho, setRunOutWho] = useState('')
  const [runOutRuns, setRunOutRuns] = useState(0)

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
  const freeHit = !!match.freeHit

  const outs = match.log.filter((b) => b.innings === match.innings && b.wicket).map((b) => b.out || b.batter)
  const nextBatters = (batTeam?.players || []).filter((p) => !outs.includes(p) && p !== striker && p !== nonStriker)
  // max overs per bowler (T20 = 4)
  const maxOvers = Math.ceil(match.overs / 5)
  const ballsBowled = (p) =>
    match.log.filter((b) => b.innings === match.innings && b.bowler === p && b.extra !== 'wide' && b.extra !== 'no ball').length
  const bowlers = (bowlTeam?.players || []).filter((p) => p !== lastBowler && ballsBowled(p) < maxOvers * 6)

  // how = '' (no wicket), 'out' (striker out) or 'run out'
  function addBall(runs, how = '', outName = '') {
    if (!striker || !nonStriker || !bowler) return alert('select striker, non striker and bowler')

    if (how === 'out' && freeHit) return alert('free hit - only run out allowed')
    const isWicket = how !== ''
    const ex = how === 'out' ? '' : extra
    const legal = ex !== 'wide' && ex !== 'no ball'
    const total = legal ? runs : runs + 1

    const newScore = {
      runs: s.runs + total,
      wickets: isWicket ? s.wickets + 1 : s.wickets,
      balls: legal ? s.balls + 1 : s.balls,
    }

    const out = how === 'out' ? striker : outName
    // state before this ball, for undo
    const prev = {
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      striker,
      nonStriker,
      bowler,
      lastBowler,
      innings: match.innings,
      status: match.status,
      freeHit,
    }
    const ball = { innings: match.innings, over: overs(newScore.balls), batter: striker, bowler, runs, extra: ex, wicket: isWicket, how, out, prev }
    const changes = { [batSide]: newScore, log: [ball, ...match.log] }

    // strike change on odd runs
    let st = striker
    let ns = nonStriker
    if (runs % 2 === 1) [st, ns] = [ns, st]

    // over done -> swap ends and new bowler
    if (legal && newScore.balls % 6 === 0) {
      ;[st, ns] = [ns, st]
      changes.lastBowler = bowler
      changes.bowler = ''
    }
    // out batter leaves, new one comes at that end
    if (isWicket) {
      if (st === out) st = ''
      if (ns === out) ns = ''
    }
    changes.striker = st
    changes.nonStriker = ns

    // no ball -> next ball free hit, wide keeps it
    if (ex === 'no ball') changes.freeHit = true
    else if (ex !== 'wide') changes.freeHit = false

    const allOut = newScore.wickets >= 10
    const oversDone = newScore.balls >= match.overs * 6
    const chased = match.innings === 2 && newScore.runs >= target

    if (allOut || oversDone || chased) {
      changes.striker = ''
      changes.nonStriker = ''
      changes.bowler = ''
      changes.lastBowler = ''
      changes.freeHit = false
      if (match.innings === 1) {
        changes.innings = 2
        alert(`innings over, target ${newScore.runs + 1}`)
      } else {
        changes.status = 'finished'
        ball.endedMatch = true
        alert('match over')
      }
    }

    setExtra('')
    updateMatch(changes)
  }

  // only if match is live or last ball ended it
  const canUndo = match.log[0]?.prev && (match.status === 'live' || match.log[0].endedMatch)

  function undo() {
    updateMatch({ ...match.log[0].prev, log: match.log.slice(1) })
    setExtra('')
  }

  function runOut() {
    if (!runOutWho) return alert('who is run out?')
    addBall(Number(runOutRuns), 'run out', runOutWho)
    setRunOutWho('')
    setRunOutRuns(0)
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
      <p>{match.format} {match.overs} overs | Innings {match.innings}</p>
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
            {` | max ${maxOvers} overs each`}
          </p>
          {freeHit && <p>FREE HIT</p>}
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
            {' '}<button onClick={() => addBall(0, 'out')}>wicket</button>
          </p>
          <p>
            Run out:{' '}
            <select value={runOutWho} onChange={(e) => setRunOutWho(e.target.value)}>
              <option value="">who</option>
              {striker && <option value={striker}>{striker}</option>}
              {nonStriker && <option value={nonStriker}>{nonStriker}</option>}
            </select>
            {' '}runs done:{' '}
            <select value={runOutRuns} onChange={(e) => setRunOutRuns(e.target.value)}>
              {[0, 1, 2, 3].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {' '}<button onClick={runOut}>run out</button>
          </p>
        </div>
      )}

      {canUndo && <button onClick={undo}>undo last ball</button>}

      {match.log.length === 0 && <p>no ball by ball data</p>}
      <Scorecard match={match} innings={1} teamName={match.innings === 1 ? batTeam?.name : bowlTeam?.name} />
      <Scorecard match={match} innings={2} teamName={batTeam?.name} />

      <h3>Ball by ball</h3>
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
