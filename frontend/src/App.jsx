import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamDetails from './pages/TeamDetails'
import { teams as dummyTeams } from './data/dummy'

function App() {
  const [teams, setTeams] = useState(dummyTeams)

  return (
    <div>
      <h1>Scoreboard Manager</h1>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams teams={teams} setTeams={setTeams} />} />
        <Route path="/teams/:id" element={<TeamDetails teams={teams} setTeams={setTeams} />} />
      </Routes>
    </div>
  )
}

export default App
