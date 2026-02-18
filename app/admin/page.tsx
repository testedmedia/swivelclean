'use client'

import { useEffect, useState } from 'react'

interface Booking {
  id: string
  address: string
  service: string
  scheduledDate: string
  price: number
  status: string
  client: {
    name: string
    email: string
    phone: string
  }
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      setBookings(data)

      // Calculate stats
      const total = data.length
      const completed = data.filter((b: Booking) => b.status === 'completed').length
      const pending = data.filter((b: Booking) => b.status === 'pending').length
      const revenue = data.reduce((sum: number, b: Booking) => sum + b.price, 0)

      setStats({ total, completed, pending, revenue })
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage bookings, cleaners, and revenue</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-semibold">Total Bookings</div>
            <div className="text-4xl font-bold text-teal-600 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-semibold">Pending</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-semibold">Completed</div>
            <div className="text-4xl font-bold text-green-600 mt-2">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-semibold">Total Revenue</div>
            <div className="text-4xl font-bold text-teal-600 mt-2">${stats.revenue.toFixed(2)}</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No bookings yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Client</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Address</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Service</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{booking.client.name}</div>
                        <div className="text-xs text-gray-500">{booking.client.email}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{booking.address}</td>
                      <td className="px-6 py-4 text-gray-700">{booking.service}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-teal-600">${booking.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h3 className="font-bold text-teal-700 mb-2">Next Steps</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>☐ Set up Stripe webhook for real-time updates</li>
              <li>☐ Connect email service for automated sequences</li>
              <li>☐ Add team member management</li>
              <li>☐ Set up calendar view</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-700 mb-2">Integrations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Email (Resend)</li>
              <li>✓ Database (Supabase)</li>
              <li>○ Stripe Webhooks (pending)</li>
              <li>○ Calendar Sync (pending)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
