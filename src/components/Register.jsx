import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { supabase } from './supabaseClient'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false) 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => { 
    e.preventDefault()
    setError('')
    setSuccess('')


    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    // --- Supabase Registration ---
    const { data, error: sbError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      }
    })

    if (sbError) {
      setError(sbError.message)
      setLoading(false)
    } else {
      setSuccess('Registration successful! Please check your email for a confirmation link.')
      setLoading(false)
      
      
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })

   
      if (data.session) {
          setTimeout(() => navigate('/dashboard'), 2000)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-purple-700 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm border-l-4 border-l-red-500">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm border-l-4 border-l-green-500">{success}</div>}

          <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register