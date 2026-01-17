import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// 1. Import the client you created earlier
import { supabase } from './supabaseClient'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // Added loading state

  const handleSubmit = async (e) => { // Added async
    e.preventDefault()
    
    // Basic Validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setError('')
    setLoading(true) // Start loading

    // 2. Supabase Sign In call
    const { data, error: sbError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (sbError) {
      setError(sbError.message)
      setLoading(false)
    } else {
      // 3. Success! 
      // Supabase automatically saves the session in LocalStorage for you
      console.log('Login successful:', data.user)
      setLoading(false)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-purple-700 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

          <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">Don't have an account? <Link to="/" className="text-blue-500 font-semibold hover:underline">Sign up</Link></p>
          <p><a href="#" className="text-blue-500 font-semibold hover:underline">Forgot password?</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login