import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Scoreboard Manager</h1>
      <Routes>
        <Route path="/" element={<p>home</p>} />
      </Routes>
    </div>
  )
}

export default App
