import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamDetails from './pages/TeamDetails'
import Matches from './pages/Matches'
import { teams as dummyTeams, matches as dummyMatches } from './data/dummy'

function App() {
  const [teams, setTeams] = useState(dummyTeams)
  const [matches, setMatches] = useState(dummyMatches)

  return (
    <div>
      <h1>Scoreboard Manager</h1>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams teams={teams} setTeams={setTeams} />} />
        <Route path="/teams/:id" element={<TeamDetails teams={teams} setTeams={setTeams} />} />
        <Route path="/matches" element={<Matches teams={teams} matches={matches} setMatches={setMatches} />} />
      </Routes>
    </div>
  )
}

export default App
