import { useState, useEffect, useRef } from 'react'
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
import { api, getUser } from './api'

function App() {
  const [leagues, setLeagues] = useState([])
  const [teams, setTeamsState] = useState([])
  const [matches, setMatchesState] = useState([])
  const [user, setUser] = useState(getUser)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // api calls run one after another so live score updates stay in order
  const queue = useRef(Promise.resolve())

  async function loadData() {
    try {
      const [l, t, m] = await Promise.all([api.get('/leagues'), api.get('/teams'), api.get('/matches')])
      setLeagues(l)
      setTeamsState(t)
      setMatchesState(m)
      setError('')
    } catch (err) {
      setError('could not reach server: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // pages still call setTeams(newList) / setMatches(newList)
  // compare with the old list and send the changes to the backend
  function syncList(path, oldList, newList) {
    const oldById = new Map(oldList.map((x) => [x.id, x]))
    const newIds = new Set(newList.map((x) => x.id))
    const calls = []
    newList.forEach((x) => {
      const old = oldById.get(x.id)
      if (!old) calls.push(() => api.post(path, x))
      else if (old !== x) calls.push(() => api.put(`${path}/${x.id}`, x))
    })
    oldList.forEach((x) => {
      if (!newIds.has(x.id)) calls.push(() => api.del(`${path}/${x.id}`))
    })

    calls.forEach((call) => {
      queue.current = queue.current.then(call).catch((err) => {
        alert(err.message)
        if (!getUser()) setUser(null)
        return loadData()
      })
    })
  }

  function canEdit() {
    if (user) return true
    alert('login first to make changes')
    return false
  }

  function setTeams(newList) {
    if (!canEdit()) return
    syncList('/teams', teams, newList)
    setTeamsState(newList)
  }

  function setMatches(newList) {
    if (!canEdit()) return
    syncList('/matches', matches, newList)
    setMatchesState(newList)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4">
          <h1 className="text-lg font-extrabold">Scoreboard Manager</h1>
          <Navbar user={user} setUser={setUser} />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        {loading && <p className="text-muted">Loading...</p>}
        {error && (
          <p>
            {error} <button onClick={loadData}>retry</button>
          </p>
        )}
        {!loading && !error && (
          <Routes>
            <Route path="/" element={<Home teams={teams} matches={matches} />} />
            <Route path="/teams" element={<Teams teams={teams} setTeams={setTeams} leagues={leagues} />} />
            <Route path="/teams/:id" element={<TeamDetails teams={teams} setTeams={setTeams} leagues={leagues} />} />
            <Route path="/matches" element={<Matches teams={teams} matches={matches} setMatches={setMatches} leagues={leagues} />} />
            <Route path="/matches/:id" element={<Scoreboard teams={teams} matches={matches} setMatches={setMatches} />} />
            <Route path="/leaderboard" element={<Leaderboard teams={teams} matches={matches} leagues={leagues} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
