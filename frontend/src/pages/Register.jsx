import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: call backend register api
    console.log(name, email, password)
    alert('backend not ready yet')
  }

  return (
    <div className="max-w-sm">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary">Create account</button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
