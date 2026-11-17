import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamDetails from './pages/TeamDetails'
import Matches from './pages/Matches'
import Scoreboard from './pages/Scoreboard'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Register from './pages/Register'
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
        <Route path="/matches/:id" element={<Scoreboard teams={teams} matches={matches} setMatches={setMatches} />} />
        <Route path="/leaderboard" element={<Leaderboard teams={teams} matches={matches} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
