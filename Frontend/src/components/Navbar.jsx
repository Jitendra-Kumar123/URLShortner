import React from 'react'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token') // Check if user is logged in
  const userName = localStorage.getItem('userName') || 'User'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    window.location.href = '/' // Redirect to home
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">URL Shortner</span>
            </Link>
          </div>

          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-medium">Welcome, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  Register
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
