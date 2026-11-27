import { NavLink } from 'react-router-dom'
import { logout } from '../api'

const linkClass = ({ isActive }) =>
  'no-underline hover:text-ink hover:no-underline ' + (isActive ? 'text-ink font-semibold' : 'text-muted')

function Navbar({ user, setUser }) {
  function handleLogout() {
    logout()
    setUser(null)
  }

  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/teams" className={linkClass}>Teams</NavLink></li>
        <li><NavLink to="/matches" className={linkClass}>Matches</NavLink></li>
        <li><NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink></li>
        {user ? (
          <li className="text-muted">
            {user.name} ({user.role}){' '}
            <button onClick={handleLogout} className="ml-1 text-sm">Logout</button>
          </li>
        ) : (
          <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
