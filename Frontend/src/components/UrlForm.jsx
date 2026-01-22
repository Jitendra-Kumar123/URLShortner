import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const UrlForm = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [customSlug, setCustomSlug] = useState('')

  const queryClient = useQueryClient()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setShortUrl('')
    setCopied(false)

    try {
      const result = await createShortUrl(url, customSlug || undefined)
      setShortUrl(result)
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to shorten URL")
    }
    setLoading(false)
  }

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className='text-2xl ml-30'>URL Shortner</h1>
        <input
          type="url"
          id='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL here"
          required
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {isAuthenticated && (
          <input
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Custom slug (optional)"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition duration-300"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && (
        <p className="text-red-600 mt-4 font-semibold text-center">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-100 rounded-md text-center flex items-center justify-center space-x-3">
          <p className="text-green-800 font-semibold">
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{shortUrl}</a>
          </p>
          <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded text-white ${copied ? 'bg-green-500' : 'bg-blue-600'} transition-colors duration-300`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default UrlForm
