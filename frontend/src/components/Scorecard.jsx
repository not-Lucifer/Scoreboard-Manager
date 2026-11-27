import { overs } from '../utils'

// batting + bowling stats for one innings, worked out from ball log
function Scorecard({ match, innings, teamName }) {
  const balls = [...match.log].reverse().filter((b) => b.innings === innings)
  if (balls.length === 0) return null

  const batters = {}
  const bowlers = {}
  let extras = 0

  balls.forEach((b) => {
    if (!batters[b.batter]) batters[b.batter] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false }
    if (!bowlers[b.bowler]) bowlers[b.bowler] = { balls: 0, runs: 0, wickets: 0 }
    const bat = batters[b.batter]
    const bowl = bowlers[b.bowler]

    if (b.extra === '' || b.extra === 'no ball') {
      bat.runs += b.runs
      if (b.runs === 4) bat.fours++
      if (b.runs === 6) bat.sixes++
    }
    if (b.extra !== 'wide') bat.balls++
    if (b.wicket) {
      const outName = b.out || b.batter
      if (!batters[outName]) batters[outName] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false }
      batters[outName].out = true
      // run out is not bowler's wicket
      if (b.how !== 'run out') bowl.wickets++
    }

    if (b.extra === 'wide') {
      extras += b.runs + 1
      bowl.runs += b.runs + 1
    } else if (b.extra === 'no ball') {
      extras += 1
      bowl.runs += b.runs + 1
    } else if (b.extra === 'bye' || b.extra === 'leg bye') {
      extras += b.runs
    } else {
      bowl.runs += b.runs
    }
    if (b.extra !== 'wide' && b.extra !== 'no ball') bowl.balls++
  })

  // batters at crease who haven't faced yet
  if (innings === match.innings) {
    ;[match.striker, match.nonStriker].forEach((p) => {
      if (p && !batters[p]) batters[p] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false }
    })
  }

  const total = Object.values(batters).reduce((sum, b) => sum + b.runs, 0) + extras

  return (
    <div>
      <h3>Innings {innings} - {teamName}</h3>
      <div className="overflow-x-auto">
      <table className="[&_td:not(:first-child)]:text-right [&_th:not(:first-child)]:text-right">
        <thead>
          <tr>
            <th>Batter</th>
            <th>R</th>
            <th>B</th>
            <th>4s</th>
            <th>6s</th>
            <th>SR</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(batters).map(([name, b]) => (
            <tr key={name}>
              <td>{name}{name === match.striker && innings === match.innings ? ' *' : ''}</td>
              <td>{b.runs}</td>
              <td>{b.balls}</td>
              <td>{b.fours}</td>
              <td>{b.sixes}</td>
              <td>{b.balls ? ((b.runs / b.balls) * 100).toFixed(1) : '-'}</td>
              <td className="text-muted">{b.out ? 'out' : 'not out'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="text-sm text-muted">Extras: {extras} | Total: {total}</p>

      <div className="overflow-x-auto">
      <table className="mt-4 [&_td:not(:first-child)]:text-right [&_th:not(:first-child)]:text-right">
        <thead>
          <tr>
            <th>Bowler</th>
            <th>O</th>
            <th>R</th>
            <th>W</th>
            <th>Econ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(bowlers).map(([name, b]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{overs(b.balls)}</td>
              <td>{b.runs}</td>
              <td>{b.wickets}</td>
              <td>{b.balls ? ((b.runs / b.balls) * 6).toFixed(1) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Scorecard
