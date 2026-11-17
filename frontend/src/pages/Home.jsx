import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Manage teams, matches and live scores.</p>
      <Link to="/matches">Go to matches</Link>
    </div>
  )
}

export default Home
