import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <h1>Scoreboard Manager</h1>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<p>home</p>} />
      </Routes>
    </div>
  )
}

export default App
