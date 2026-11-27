import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  'no-underline hover:text-ink hover:no-underline ' + (isActive ? 'text-ink font-semibold' : 'text-muted')

function Navbar() {
  return (
    <nav>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/teams" className={linkClass}>Teams</NavLink></li>
        <li><NavLink to="/matches" className={linkClass}>Matches</NavLink></li>
        <li><NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink></li>
        <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
