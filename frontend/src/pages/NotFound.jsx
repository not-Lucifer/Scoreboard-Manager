import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h2>404 - page not found</h2>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFound
