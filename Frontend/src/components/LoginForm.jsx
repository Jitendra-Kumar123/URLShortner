import React, { useState } from 'react'
import { loginUser } from '../api/user.api'
import { useSelector } from 'react-redux'
import { Link } from '@tanstack/react-router'

const LoginForm = ({state}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await loginUser(password, email)
      console.log('Login successful:', response)
    } catch (err) {
      setError('Login failed. Please check your credentials.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#155DFC] focus:border-[#155DFC]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#155DFC] focus:border-[#155DFC]"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#155DFC] text-white py-2 px-4 rounded-md hover:bg-[#0D4BB5] focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
          <Link to="/RegisterForm.jsx" className='bg-blue-500 px-4 py-2 rounded-2xl'>Don't have an account? Register</Link>
        </button>
      </form>
    </div>
  )
}

export default LoginForm
