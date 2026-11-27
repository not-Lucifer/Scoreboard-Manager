import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <p className="num text-9xl leading-none text-muted">404</p>
      <h2 className="mt-4">Page not found</h2>
      <p className="text-muted">This address doesn't match any page.</p>
      <Link to="/">Go to home</Link>
    </div>
  )
}

export default NotFound
