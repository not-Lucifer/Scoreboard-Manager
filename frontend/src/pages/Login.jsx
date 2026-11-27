import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: call backend login api
    console.log(email, password)
    alert('backend not ready yet')
  }

  return (
    <div className="max-w-sm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary">Log in</button>
      </form>
      <p className="mt-6 text-sm text-muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
