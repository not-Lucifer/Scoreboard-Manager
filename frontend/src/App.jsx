import { useState, useEffect } from 'react'
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
import NotFound from './pages/NotFound'
import { leagues, teams as dummyTeams, matches as dummyMatches } from './data/dummy'

const KEY = 'sbm-v1'

// load saved data, else dummy data
function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved && saved.teams && saved.matches) return saved
  } catch {
    // bad data, ignore
  }
  return { teams: dummyTeams, matches: dummyMatches }
}

function App() {
  const [teams, setTeams] = useState(() => loadData().teams)
  const [matches, setMatches] = useState(() => loadData().matches)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ teams, matches }))
    } catch {
      // storage full or blocked
    }
  }, [teams, matches])

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4">
          <h1 className="text-lg font-extrabold">Scoreboard Manager</h1>
          <Navbar />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
      <Routes>
        <Route path="/" element={<Home teams={teams} matches={matches} />} />
        <Route path="/teams" element={<Teams teams={teams} setTeams={setTeams} leagues={leagues} />} />
        <Route path="/teams/:id" element={<TeamDetails teams={teams} setTeams={setTeams} leagues={leagues} />} />
        <Route path="/matches" element={<Matches teams={teams} matches={matches} setMatches={setMatches} leagues={leagues} />} />
        <Route path="/matches/:id" element={<Scoreboard teams={teams} matches={matches} setMatches={setMatches} />} />
        <Route path="/leaderboard" element={<Leaderboard teams={teams} matches={matches} leagues={leagues} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
    </div>
  )
}

export default App
