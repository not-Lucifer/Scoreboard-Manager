import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, saveLogin } from '../api'

function Register({ setUser }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await api.post('/auth/register', { name, email, password })
      saveLogin(data)
      setUser(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary">Create account</button>
      </form>
      {error && <p className="text-sm text-live">{error}</p>}
      <p className="mt-6 text-sm text-muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
