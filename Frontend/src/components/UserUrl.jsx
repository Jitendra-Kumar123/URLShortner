import React, { useState, useEffect } from 'react'
import { Copy, Trash2, ExternalLink } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'

const UserUrl = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    fetchUserUrls()
  }, [])

  const fetchUserUrls = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get('/api/user/urls')
      setUrls(data.urls || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch URLs')
      setUrls([])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteUrl = async (id) => {
    try {
      await axiosInstance.delete(`/api/urls/${id}`)
      setUrls(urls.filter(url => url._id !== id))
    } catch (err) {
      alert('Failed to delete URL')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your URLs</h1>
          <p className="text-gray-600">Manage and track all your shortened URLs</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {urls.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No URLs yet</h2>
            <p className="text-gray-600">Create your first shortened URL to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table View for Desktop */}
            <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className=" from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Short URL</th>
                    <th className="px-6 py-4 text-left font-semibold">Full URL</th>
                    <th className="px-6 py-4 text-center font-semibold">Clicks</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url, index) => (
                    <tr key={url._id} className={`border-t hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`${window.location.origin}/${url.shortId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-mono break-all flex items-center gap-1"
                          >
                            {url.shortId}
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 break-all max-w-xs hover:text-gray-900 cursor-pointer" title={url.fullUrl}>
                          {url.fullUrl?.length > 50 ? url.fullUrl.substring(0, 50) + '...' : url.fullUrl}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {url.clicks || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => copyToClipboard(`${window.location.origin}/${url.shortId}`, url._id)}
                            className={`p-2 rounded-lg transition-all ${
                              copied === url._id
                                ? 'bg-green-100 text-green-600'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                            title="Copy short URL"
                          >
                            <Copy size={18} />
                          </button>
                          <button
                            onClick={() => deleteUrl(url._id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                            title="Delete URL"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card View for Mobile */}
            <div className="lg:hidden space-y-4">
              {urls.map((url) => (
                <div key={url._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Short URL</p>
                    <a
                      href={`${window.location.origin}/${url.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-mono break-all flex items-center gap-2 text-lg"
                    >
                      {url.shortId}
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Full URL</p>
                    <p className="text-gray-700 break-all text-sm" title={url.fullUrl}>
                      {url.fullUrl}
                    </p>
                  </div>

                  <div className="mb-4 flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Clicks</p>
                      <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                        {url.clicks || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/${url.shortId}`, url._id)}
                      className={`flex-1 p-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        copied === url._id
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <Copy size={16} />
                      {copied === url._id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => deleteUrl(url._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Footer */}
        {urls.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total URLs</p>
                <p className="text-3xl font-bold text-blue-600">{urls.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Clicks</p>
                <p className="text-3xl font-bold text-green-600">
                  {urls.reduce((sum, url) => sum + (url.clicks || 0), 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Avg Clicks/URL</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {Math.round(urls.reduce((sum, url) => sum + (url.clicks || 0), 0) / urls.length)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserUrl