export function overs(balls) {
  return Math.floor(balls / 6) + '.' + (balls % 6)
}

export function scoreText(m) {
  if (m.sport === 'cricket') {
    return `${m.scoreA.runs}/${m.scoreA.wickets} (${overs(m.scoreA.balls)}) - ${m.scoreB.runs}/${m.scoreB.wickets} (${overs(m.scoreB.balls)})`
  }
  return `${m.scoreA} - ${m.scoreB}`
}
