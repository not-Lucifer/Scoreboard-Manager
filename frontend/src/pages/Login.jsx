import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, saveLogin } from '../api'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await api.post('/auth/login', { email, password })
      saveLogin(data)
      setUser(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary">Log in</button>
      </form>
      {error && <p className="text-sm text-live">{error}</p>}
      <p className="mt-6 text-sm text-muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
