'use client'

import { useEffect, useState } from 'react'

interface Booking {
  id: string
  address: string
  service: string
  scheduledDate: string
  scheduledTime: string
  price: number
  status: string
  notes?: string
  client: {
    name: string
    email: string
    phone: string
  }
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const STATUS_FLOW = ['pending', 'confirmed', 'completed']

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(null)
    }
  }

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue:   bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.price, 0),
    earned:    bookings.filter(b => b.status === 'completed').reduce((s, b) => s + b.price, 0),
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">SwivelClean Admin</h1>
            <p className="text-sm text-gray-500 mt-0.5">Booking management dashboard</p>
          </div>
          <button onClick={fetchBookings} className="flex items-center gap-2 text-sm font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-all border border-teal-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total',     value: stats.total,               color: 'text-gray-900',  bg: 'bg-white' },
            { label: 'Pending',   value: stats.pending,             color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Confirmed', value: stats.confirmed,           color: 'text-blue-600',  bg: 'bg-blue-50' },
            { label: 'Completed', value: stats.completed,           color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Pipeline',  value: `$${stats.revenue.toFixed(0)}`,  color: 'text-teal-600',  bg: 'bg-teal-50' },
            { label: 'Earned',    value: `$${stats.earned.toFixed(0)}`,   color: 'text-teal-700',  bg: 'bg-teal-100' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-5 border border-gray-100 shadow-sm`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                filter === f
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && (
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === f ? 'bg-teal-500' : 'bg-gray-100 text-gray-500'}`}>
                  {bookings.filter(b => b.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading bookings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-gray-500 font-medium">No {filter !== 'all' ? filter : ''} bookings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Main row */}
                <div className="flex items-center gap-4 px-6 py-4">
                  {/* Status badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border flex-shrink-0 ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                    {booking.status.toUpperCase()}
                  </span>

                  {/* Client */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{booking.client.name}</span>
                      <span className="text-xs text-gray-400">{booking.client.phone}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{booking.address}</p>
                  </div>

                  {/* Service + Date */}
                  <div className="hidden sm:block text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-800">{booking.service === 'standard' ? 'Standard Turnover' : booking.service === 'premium' ? 'Premium Turnover' : booking.service === 'deep' ? 'Deep Clean' : booking.service}</p>
                    <p className="text-xs text-gray-500">{fmtDate(booking.scheduledDate)} · {booking.scheduledTime}</p>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-lg font-extrabold text-teal-600">${booking.price}</p>
                  </div>

                  {/* Expand */}
                  <button onClick={() => setExpanded(expanded === booking.id ? null : booking.id)} className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === booking.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                {/* Expanded detail */}
                {expanded === booking.id && (
                  <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
                    <div className="grid sm:grid-cols-2 gap-6 mb-5">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Client Info</p>
                        <div className="space-y-1.5">
                          <p className="text-sm"><span className="text-gray-500">Name:</span> <span className="font-semibold">{booking.client.name}</span></p>
                          <p className="text-sm"><span className="text-gray-500">Email:</span> <a href={`mailto:${booking.client.email}`} className="font-semibold text-teal-600">{booking.client.email}</a></p>
                          <p className="text-sm"><span className="text-gray-500">Phone:</span> <a href={`tel:${booking.client.phone}`} className="font-semibold text-teal-600">{booking.client.phone}</a></p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Job Details</p>
                        <div className="space-y-1.5">
                          <p className="text-sm"><span className="text-gray-500">Address:</span> <span className="font-semibold">{booking.address}</span></p>
                          <p className="text-sm"><span className="text-gray-500">Date:</span> <span className="font-semibold">{fmtDate(booking.scheduledDate)} at {booking.scheduledTime}</span></p>
                          <p className="text-sm"><span className="text-gray-500">Service:</span> <span className="font-semibold">{booking.service}</span></p>
                          {booking.notes && <p className="text-sm"><span className="text-gray-500">Notes:</span> <span className="font-semibold">{booking.notes}</span></p>}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {STATUS_FLOW.filter(s => s !== booking.status).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(booking.id, s)}
                          disabled={updating === booking.id}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${
                            s === 'completed' ? 'bg-green-600 text-white hover:bg-green-700' :
                            s === 'confirmed' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                            'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {updating === booking.id ? 'Updating...' : `Mark ${s.charAt(0).toUpperCase() + s.slice(1)}`}
                        </button>
                      ))}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          disabled={updating === booking.id}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                      <a href={`tel:${booking.client.phone}`} className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-all">
                        Call Client
                      </a>
                      <a href={`mailto:${booking.client.email}`} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                        Email Client
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
